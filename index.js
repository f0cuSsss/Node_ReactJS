const fs = require('fs');
const http = require('http');
const mysql2 = require('mysql2');

fs.readFile('db_config.json', (err, data) => {
    if(err){
        console.log(err);
        return;
    }
    try{
        db_conf = JSON.parse(data);
        con_p = mysql2.createPool(db_conf).promise();
    } catch (ex) {
        console.error(err);
        return;
    }
    http.createServer(httpContext).listen(80);
    console.log("Server is working...");
});


const httpContext = (request, response) => {
    const req = decodeURI(request.url.split('/'));

    // Load main page
    if(req[1] == ""){
        var homePage = fs.createReadStream("main_page.html");
        homePage.on('open',
            () =>
            {
                response.writeHead(200);
                homePage.pipe(response);
            })

        return;
    }

    // api get part of books
    if(request.url.toLowerCase().indexOf("/api/books") == 0){

        var booksPart = 2;
        var partNumber = parseInt(request.url.substr(11));
        if(isNaN(partNumber)) return;

        var offset = booksPart * (partNumber - 1);

        con_p.query(`
            SELECT * 
            FROM 
            Books b 
            JOIN 
            Author a on b.id_author = a.id
            LIMIT ${offset}, ${booksPart}
        `)
            .then(([data, columns]) => {
                //console.log(data);
                var str = JSON.stringify(data);
                response.writeHead(200);
                response.end(str);
                //con_p.end();
            })
            .catch((err) => { console.log(err) });


        return;
    }

    // api get book by id
    if(request.url.toLowerCase().indexOf("/api/book") == 0){

        var bookID = parseInt(request.url.substr(10));
        if(isNaN(bookID)) return;

        con_p.query(`
            SELECT * 
            FROM 
            Books b 
            JOIN 
            Author a on b.id_author = a.id
            AND b.id = ${bookID}
        `)
            .then(([data, columns]) => {
                var str = JSON.stringify(data);
                response.writeHead(200);
                response.end(str);
            })
            .catch((err) => { console.log(err) });

        return;
    }

    // Load file if exists
    const fname = decodeURI(request.url.substr(1));
    if(fs.existsSync(fname)){
        var stream = fs.createReadStream(fname);
        stream.on('open', () => {
            response.writeHead(200);
            stream.pipe(response);
        })
    }




}

//http.createServer(httpContext).listen(82);
//console.log("Server is working...");
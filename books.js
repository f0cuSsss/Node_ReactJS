
//const e = React.createElement;
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

class Books extends React.Component{
    constructor(props) {
        super(props);
        this.state = { books: [], bookPart: 1 }
        this.loadMore = this.loadMore.bind(this);
        this.showDetailsBook = this.showDetailsBook.bind(this);
    }

    showDetailsBook(e){
        deleteAllCookies();
        var id = e.target.id;

        if(!id && id < 0)
            id = 1;
        document.cookie = "bookID=" + id;
        window.location = "DetailBook.html";

    }

    // Первичный конструктор, который включается
    componentDidMount() {

    }

    loadMore(){
        fetch('/api/books/' + this.state.bookPart)
            .then(r => r.json())
            .then(data => {
                this.setState( {
                    books: this.state.books.concat(data),
                    bookPart: this.state.bookPart+1
                });
                console.log(this.state.books);
            });
    }

    render(){
        return (
        <div className='books-div'>
            { this.state.books.map(bk =>
                <div className='book' id={bk.id} onClick={this.showDetailsBook} >
                    <img src={'/covers/' + bk.cover_file}   /> <br/>

                    <table>
                        <tr> <td><i>Название:       </i></td> <td>{bk.title} </td> </tr>
                        <tr> <td><i>Автор:          </i></td> <td>{bk.name}  </td> </tr>
                        <tr> <td><i>Год:            </i></td> <td>{bk.year}  </td> </tr>
                        <tr> <td><i>Кол-во страниц: </i></td> <td>{bk.pages} </td> </tr>
                    </table>

                    <b>{bk.price}</b><span> грн.</span>
                </div>
            )}
            <button onClick={this.loadMore}
                    className='load-more-btn btn btn-info'>Загрузить еще...</button>
        </div>
        );

    }
}

ReactDOM.render(<Books/>,
    document.getElementById('wrap'));

//ReactDOM.render(e(Books, {}, null),
//    document.getElementById('books'));





/*

<div class='book'>
        <img ng-src='/covers/{{book.cover_file}}' /> <br/>

        <table>
            <tr> <td><i>Название: </i></td> <td>{{book.title}}</td> </tr>
            <tr> <td><i>Автор: </i></td> <td>{{book.name}}</td> </tr>
            <tr> <td><i>Год: </i></td> <td>{{book.year}}</td> </tr>
            <tr> <td><i>Кол-во страниц: </i></td> <td>{{book.pages}}</td> </tr>
        </table>

        <b>{{book.price}}</b><span> грн.</span>
    </div>

    <br/><br/>
    <input class="load-books-btn" type="button" ng-click="loadBooks()" value="Загрузить еще книги"/>
    <br/><br/><br/>
 */

function get_cookie ( cookie_name )
{
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
}

class DetailBook extends React.Component {
    constructor(props) {
        super(props)
        this.state = { book: [] };
        this.doOrder = this.doOrder.bind(this)

        var id = get_cookie("bookID")
        console.log(id)
        fetch('/api/book/' + id)
            .then(r => r.json())
            .then(data => {
                this.setState( {
                    book: data
                });
                //console.log(this.state.book);
            });
    }

    doOrder(){
        alert("Вы купили книгу");
    }

    render(){
        //var bk = this.state.book;
        //console.log(bk[0]);
        //console.log(bk[0].title);
        return (
            <div>
                <b>{this.state.book[0].title}</b>

                <button onClick={this.doOrder}>Купить книгу</button>
            </div>
        );
    }
}

/*
<img src={'/covers/' + this.state.book.cover_file}   />
                <table>
                    <tr> <td><i>Название:       </i></td> <td>{bk.title} </td> </tr>
                    <tr> <td><i>Автор:          </i></td> <td>{bk.name}  </td> </tr>
                    <tr> <td><i>Год:            </i></td> <td>{bk.year}  </td> </tr>
                    <tr> <td><i>Кол-во страниц: </i></td> <td>{bk.pages} </td> </tr>
                </table>

                <b>{bk.price}</b><span> грн.</span>
 */

ReactDOM.render(<DetailBook/>,
    document.getElementById('detailBook'));
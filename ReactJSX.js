const c6 = <h1>Привет babel</h1>;

ReactDOM.render(c6, document.getElementById('container6'));


class Cont7 extends React.Component {
    render() {
        return <ol>
            <li>Str 1</li>
            <li>Str 2</li>
            </ol>;
    }
}

ReactDOM.render(<Cont7 />, document.getElementById('container7'));



class Cont8 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cnt:0}
        this.click1 = this.click1.bind(this);
    }

    click1(){
        this.setState({cnt: this.state.cnt+1})
    }

    render(){
        return <div>
            <button onClick={this.click1}>Press</button>
            <h3>Кликов {this.state.cnt}</h3>
            <h4>Повтор: {this.state.cnt}</h4>
        </div>
    }
}

ReactDOM.render(<Cont8/>, document.getElementById('container8'));
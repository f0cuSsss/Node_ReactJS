class Hello extends React.Component {
    render() {
        return React.createElement('h2', {}, 'Hello world');
    }
}

ReactDOM.render
(React.createElement(Hello, {}, null), document.getElementById('container1'));

const e = React.createElement; // псеводним  фунцкии


class Element2 extends React.Component {
    render() { // className - css class
        return e(
            "ul",                                       // имя тэга (standart)
            { className: "ul-class" },                  // список атрибутов
                                                        // дочерние элементы, разделенные запятыми
            e("l", { style: {color: 'red', fontWeight: 'bold'} }, "item 1"),
            e("l", null, "item 2")

        );
    }
}
ReactDOM.render(e(Element2, {}, null), document.getElementById('container2'))


class Element3 extends React.Component {
    render() {
        return e("ol", null, ['a', 'b', 'c', 'd'].map(x => e('l', {key:x}, x)));
    }
}
ReactDOM.render(e(Element3, {}, null), document.getElementById('container3'));


class Element4 extends React.Component {
    constructor(props) {
        super(props);
        this.click1 = this.click1.bind(this); // привязка к контенту

        // Работа с состояниями
        this.state = { data: 7 }
    }
    render() {
        return e('div', {},
            e('button', {onClick: this.click1}, 'Press'),
            e('h3', null, this.state.data)
        );
    }

    click1(){
        console.log("State changed to " + this.state.data);
        this.setState( { data: this.state.data+1 } );
    }
}
ReactDOM.render(e(Element4, {}, null),
    document.getElementById('container4')
);



class Element5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        //this.state = { data: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'] };
        this.click2 = this.click2.bind(this)
    }

    render() {
        return e('ol', {},
            this.state
                .data
                .map( el => e('li', {id:el.obj.id}, el.obj.value + `(${el.obj.id})`) ),
            e('button', {onClick:this.click2 }, "Add new")
        );
    }

    click2() {
        this.state.data.push({obj: {id: this.state.data.length, value: "NEW"}})
        //this.state.data.push('NEW text number')
        this.setState(this.state);
    }
}

ReactDOM.render(e(Element5, {}, null), document.getElementById('container5'))


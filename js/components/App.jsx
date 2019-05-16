import React from 'react';
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import Main from "./Main.jsx"
import fire from "./../config/firebase.js"
import Login from "./Login.jsx"


class Container extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {header, body, footer} = this.props;
        return <div className="HolyGrail">
            {header}
            {body}
            {footer}

        </div>

    }


}


export default class App extends React.Component {
    constructor() {
        super();
        this.state = ({
            user: null,
        });
        this.authListener = this.authListener.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
                localStorage.setItem('user', user.uid);
            } else {
                this.setState({ user: null });
                localStorage.removeItem('user');
            }
        });
    }


    render() {
        return  <div>{this.state.user ? ( <Container
            header={<Header/>}
            body={<Main
                user={this.state.user.uid}
            />}
            footer={<Footer/>}

        />) : (<Login />)}</div>

    }
}

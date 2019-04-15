import React, { Component } from 'react';
import fire from './../config/firebase.js';
import "./../../css/login.css"
import "./../../images/logo.png"

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            userid : '',
            email: '',
            password: '',
            username : '',
            toggleVis : 'hidden',
            age:'',
            avatar : 'avat1.png',
            sport : 'football',

        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        }).catch((error) => {
            console.log(error);
        });
        localStorage.setItem('userid', this.state.email)
    }

    signup(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
            console.log(u)

        }).catch((error) => {
                console.log(error);
            })
    }
    handleSignUpFormVisibility =()=>{
        return this.setState({
            toggleVis: this.state.toggleVis==="hidden"?'':'hidden'
        })
    };

    addNewUser = (event)=>{
        event.preventDefault();
        let addUser = fire.database().ref('users');

        const newUser = {
            username: this.state.username,
            id : this.state.email,
            age:this.state.age,
            sports: [`${this.state.sport}`] ,
            avatar : this.state.avatar,
            groups : ['brak grup'],
        };
        let addNewUser  = addUser.push(newUser);
        console.log(addNewUser.key,'ten klucz zamiast ŁYSY');
        localStorage.setItem('userid', this.state.email)





    };
    render() {
        return (
            <div className="loginFormContainer">
                <div className="logoContainer"><img src='./images/logo.png' alt="logo" className="logo" />
                    <h1>
                        TEAMMATES
                    </h1>
                </div>

                <form className="loginForm">

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email: </label>
                        <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Twój adres email" />
                        </div>


                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Hasło:</label>
                        <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Podaj hasło" />
                    </div>
                    <button type="submit" onClick={this.login} className="btn btn-primary">Zaloguj się</button>

                </form>
                <p>Nie masz jeszcze konta?</p>
                <button className="signUpBtn btn"
                        onClick={(e)=>{e.preventDefault(); this.handleSignUpFormVisibility()}}>
                    Zarejestruj się!
                </button>
                <form className={this.state.toggleVis} onSubmit={(data)=>{this.signup(data);this.addNewUser(data)}}>
                    <label>Nazwa użytkownika:</label>
                    <input value={this.state.username} onChange={this.handleChange} name="username" type="text"/>
                    <label>Email: </label>
                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control"  aria-describedby="emailHelp" placeholder="Twój adres email" />
                    <label>Hasło:</label>
                    <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" placeholder="Podaj hasło" />
                    <label>Wiek:</label>
                    <input value={this.state.age} onChange={this.handleChange} type="number" name="age" className="form-control" placeholder="Twój wiek"/>
                    <label>Ulubiony sport:</label>
                        <select
                            name="sport"
                            className="chooseSport"
                            value={this.state.sport}
                            onChange={this.handleChange}
                        >
                            <option value="football">Football</option>
                            <option value="basketball">Basketball</option>
                            <option value="tennis">Tennis</option>
                            <option value="swimming">Swimming</option>
                        </select>
                    <label>Avatar:</label>
                    <select
                        name="avatar"
                        value={this.state.avatar}
                        onChange={this.handleChange}>
                    <option value="avat1.png">1</option>
                    <option value="avat2.png">2</option>
                    </select>
                    <button type="submit"  className="btn btn-success" >Zarejestruj się</button>
                </form>


            </div>
        );
    }
}
export default Login;

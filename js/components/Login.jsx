import React, { Component } from 'react';
import fire from './../config/firebase.js';
import "./../../css/login.css"
import Header from "./Header.jsx";
import Nav from  "./Nav.jsx";


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
            age:'',
            sport : 'football',
            avatars: 'athlete.png',

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

    toggleRegistrationVis=()=>{
        document.querySelector('#signUpForm').style.display="flex";

    }

    addNewUser = (event)=>{
        event.preventDefault();
        let addUser = fire.database().ref('users');

        const newUser = {
            username: this.state.username,
            id : this.state.email,
            age:this.state.age,
            sports: [`${this.state.sport}`] ,
            avatar : this.state.avatars,
            groups : [''],
            events : [''],
        };
        let addNewUser  = addUser.push(newUser);
        console.log(addNewUser.key);
        localStorage.setItem('userid', this.state.email)





    };
    render() {
        return (
            <div className="loginFormContainer">
                <div className="loginHeader">
                <Header/>
                <div className="menuBtnInactive"/>
                </div>
                <form className="loginForm">

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email: </label>
                        <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Twój adres email" />
                        </div>


                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Hasło:</label>
                        <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Podaj hasło" />
                        <button type="submit" onClick={this.login} className="btn btn-primary">Zaloguj się</button>
                    </div>


                </form>
                <p>Nie masz jeszcze konta?</p>
                <button className="signUpBtn btn"
                        onClick={(e)=>{e.preventDefault(); this.toggleRegistrationVis()}}

                >
                    Rejestracja
                </button>
                <form id="signUpForm" onSubmit={(data)=>{this.signup(data);this.addNewUser(data)}}>
                    <label>Nazwa użytkownika:</label>
                    <input value={this.state.username} onChange={this.handleChange} name="username" type="text" className="form-control"/>
                    <label>Email: </label>
                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control"  aria-describedby="emailHelp" placeholder="Twój adres email" />
                    <label>Hasło:</label>
                    <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" placeholder="Podaj hasło" />
                    <label>Wiek:</label>
                    <input value={this.state.age} onChange={this.handleChange} type="number" name="age" className="form-control" placeholder="Twój wiek"/>
                    <label>Ulubiony sport:</label>
                        <select
                            name="sport"
                            className="form-control"
                            value={this.state.sport}
                            onChange={this.handleChange}
                        >
                            <option value="football">Piłka nożna</option>
                            <option value="basketball">Koszykówka</option>
                            <option value="tennis">Tenis ziemny</option>
                            <option value="swimming">Pływanie</option>
                            <option value="volleyball">Siatkówka</option>
                            <option value="squash">Squash</option>
                            <option value="golf">Golf</option>
                            <option value="handball">Piłka ręczna</option>
                            <option value="hockey">Hokej</option>
                            <option value="running">Bieganie</option>
                        </select>

                    <div className="cc-selector">
                        <label>Wybierz swój avatar:</label>
                        <input id="acrobat" type="radio"  value="acrobat.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio acrobat" htmlFor="acrobat"></label>
                        <input id="athlete" type="radio" value="athlete.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio athlete" htmlFor="athlete" ></label>
                        <input id="boxer" type="radio" value="boxer.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio boxer" htmlFor="boxer"></label>
                        <input id="cyclist" type="radio" value="cyclist.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio cyclist" htmlFor="cyclist"></label>
                        <input id="fitness" type="radio" value="fitness.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio fitness" htmlFor="fitness"></label>
                        <input id="basketball" type="radio" value="basketball.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio basketball" htmlFor="basketball"></label>
                        <input id="baseball-player" type="radio" value="baseball-player.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio baseball-player" htmlFor="baseball-player"></label>
                        <input id="baseball-player-1" type="radio" value="baseball-player-1.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio baseball-player-1" htmlFor="baseball-player-1"></label>
                        <input id="akebono-taro" type="radio" value="akebono-taro.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio akebono-taro" htmlFor="akebono-taro"></label>
                        <input id="akebono-taro-1" type="radio" value="akebono-taro-1.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio akebono-taro-1" htmlFor="akebono-taro-1"></label>
                        <input id="american-football" type="radio" value="american-football.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio american-football" htmlFor="american-football"></label>
                        <input id="boxer-1" type="radio" value="boxer-1.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio boxer-1" htmlFor="boxer-1"></label>
                        <input id="fitness-1" type="radio" value="fitness-1.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio fitness-1" htmlFor="fitness-1"></label>
                        <input id="fitness-2" type="radio" value="fitness-2.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio fitness-2" htmlFor="fitness-2"></label>
                        <input id="football" type="radio" value="football.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio football" htmlFor="football"></label>
                        <input id="gymnast-1" type="radio" value="gymnast-1.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio gymnast-1" htmlFor="gymnast-1"></label>
                        <input id="hockey-player" type="radio" value="hockey-player.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio hockey-player" htmlFor="hockey-player"></label>
                        <input id="jockey" type="radio" value="jockey.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio jockey" htmlFor="jockey"></label>
                        <input id="parachuter" type="radio" value="parachuter.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio parachuter" htmlFor="parachuter"></label>
                        <input id="judo" type="radio" value="judo.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio judo" htmlFor="judo"></label>
                        <input id="rollers" type="radio" value="rollers.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio rollers" htmlFor="rollers"></label>
                        <input id="runner" type="radio" value="runner.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio runner" htmlFor="runner"></label>
                        <input id="scuba-diver" type="radio" value="scuba-diver.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio scuba-diver" htmlFor="scuba-diver"></label>
                        <input id="skater" type="radio" value="skater.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio skater" htmlFor="skater"></label>
                        <input id="tennis-player-1" type="radio" value="tennis-player-1.png" name="avatars"  onChange={this.handleChange}/>
                        <label className="avatarRadio tennis-player-1" htmlFor="tennis-player-1"></label>
                    </div>
                    <button type="submit"  className="btn btn-success" >Zarejestruj się</button>
                </form>



            </div>
        );
    }
}
export default Login;

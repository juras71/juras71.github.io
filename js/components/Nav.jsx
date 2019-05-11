import React from "react";
import fire from "./../config/firebase.js"
let width = window.innerWidth;
import "./../../css/nav.css"

export default class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this);
        this.state = {
            toggleVis : "hidden",
        }

    }
    handleMenuBarVisibility =()=>{
        let btn = document.querySelector('.menuBtn')
        btn.classList.toggle('exitMenu');
        return this.setState({
            toggleVis: this.state.toggleVis==="hidden"?'':'hidden'
        })
    }

    logout() {
        fire.auth().signOut();
        location.reload();
    }
    handleNavClick(sth){
        this.props.handleNavigation(sth);
        setTimeout(()=>{
            this.handleMenuBarVisibility()
        },300);
    }
    render() {
        if (width>=1024) {
            return (
                <ul className="HolyGrail-nav">
                    <li onClick={() => this.handleNavClick('profile')}>PROFIL</li>
                    <li onClick={() => this.handleNavClick('groups')}>GRUPY</li>
                    <li id="eventLi" onClick={() => this.handleNavClick('events')}>WYDARZENIA</li>
                    <li onClick={() => this.handleNavClick('addEvent')}>DODAJ WYDARZENIE</li>
                    <li onClick={() => this.handleNavClick('addGroup')}>DODAJ GRUPĘ</li>
                    <li onClick={() => this.handleNavClick('friends')}>ZNAJOMI</li>
                    <li className="logoutBtn"  onClick={this.logout}>WYLOGUJ</li>
                </ul>

            );
        }
        else {
            return(
                <div  className="menuBar">
                    <button onClick={this.handleMenuBarVisibility} className="menuBtn burgerMenu"></button>
                    <div className={this.state.toggleVis}>
                <ul className="HolyGrail-nav">
                    <li onClick={() => this.handleNavClick('profile')}>PROFIL</li>
                    <li onClick={() => this.handleNavClick('groups')}>GRUPY</li>
                    <li id="eventLi" onClick={() => this.handleNavClick('events')}>WYDARZENIA</li>
                    <li onClick={() => this.handleNavClick('addEvent')}>DODAJ WYDARZENIE</li>
                    <li onClick={() => this.handleNavClick('addGroup')}>DODAJ GRUPĘ</li>
                    <li onClick={() => this.handleNavClick('friends')}>ZNAJOMI</li>
                    <li className="logoutBtn"  onClick={this.logout}>WYLOGUJ</li>
                </ul>
                    </div>
                </div>
            );
        }

    }

}
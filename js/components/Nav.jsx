import React from "react";
import fire from "./../config/firebase.js"
let width = window.innerWidth;
import "./../../css/nav.css"
import "./../../images/nav/profile.png"

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
                        <li onClick={() => this.handleNavClick('profile')}><img alt='' src={require('./../../images/nav/profile.png')}/>PROFIL</li>
                        <li onClick={() => this.handleNavClick('groups')} ><img alt='' src={require('./../../images/nav/groups.png')}/>GRUPY</li>
                        <li id="eventLi" onClick={() => this.handleNavClick('events')}><img alt='' src={require('./../../images/nav/events.png')}/>WYDARZENIA</li>
                        <li onClick={() => this.handleNavClick('addEvent')}><img alt='' src={require('./../../images/nav/addEvent.png')}/>DODAJ WYDARZENIE</li>
                        <li onClick={() => this.handleNavClick('addGroup')}><img alt='' src={require('./../../images/nav/addGroup.png')}/>DODAJ GRUPĘ</li>
                        <li onClick={() => this.handleNavClick('friends')}><img alt='' src={require('./../../images/nav/friends.png')}/>ZNAJOMI</li>
                        <li className="logoutBtn"  onClick={this.logout}><img alt='' src={require('./../../images/nav/logout.png')}/>WYLOGUJ</li>
                    </ul>


            );
        }
        else {
            return(
                <div  className="menuBar">
                    <button onClick={this.handleMenuBarVisibility} className="menuBtn burgerMenu"></button>
                    <div className={this.state.toggleVis}>
                <ul className="HolyGrail-nav">
                    <li onClick={() => this.handleNavClick('profile')}><img alt='' src={require('./../../images/nav/profile.png')}/>PROFIL</li>
                    <li onClick={() => this.handleNavClick('groups')} ><img alt='' src={require('./../../images/nav/groups.png')}/>GRUPY</li>
                    <li id="eventLi" onClick={() => this.handleNavClick('events')}><img alt='' src={require('./../../images/nav/events.png')}/>WYDARZENIA</li>
                    <li onClick={() => this.handleNavClick('addEvent')}><img alt='' src={require('./../../images/nav/addEvent.png')}/>DODAJ WYDARZENIE</li>
                    <li onClick={() => this.handleNavClick('addGroup')}><img alt='' src={require('./../../images/nav/addGroup.png')}/>DODAJ GRUPĘ</li>
                    <li onClick={() => this.handleNavClick('friends')}><img alt='' src={require('./../../images/nav/friends.png')}/>ZNAJOMI</li>
                    <li className="logoutBtn"  onClick={this.logout}><img alt='' src={require('./../../images/nav/logout.png')}/>WYLOGUJ</li>
                </ul>
                    </div>
                </div>
            );
        }

    }

}
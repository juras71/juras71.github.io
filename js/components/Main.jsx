import React from "react";
import Profile from "./Profile.jsx"
import Events from "./Events.jsx"
import Friends from "./Friends.jsx"
import Groups from "./Groups.jsx"
import Chats from "./Chats.jsx"
import Nav from "./Nav.jsx"
import Aside from "./Aside.jsx"
import NewEvent from "./NewEvent.jsx";
import fire from "../config/firebase";
import NewGroup from "./NewGroup.jsx";
import Event from "./Event.jsx";
import "./../../css/main.css"




export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            tab : 'addEvent',
            userInfo : this.readUsers(),
            groupInfo:this.readGroups(),
            eventInfo: this.readEvents(),
            width: 0,
            height: 0,

        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
x
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    readUsers = ()=>{

        let readUsers = fire.database().ref('users');
        readUsers.on("value", (data)=> {
            {Object.keys(data.val()).map((item ,key, index)=>{
                if (data.val()[item].id.toString()===localStorage.getItem('userid').toString()){

                    this.setState({
                        userInfo :data.val()[item],
                    })
                }

            })}


        }, function (error) {
            console.log("Error: " + error.code);
        });
    };
    readEvents = ()=>{
        let readEvents = fire.database().ref('events');
        readEvents.on("value", (data)=> {
            this.setState({
                eventInfo :data.val()
            })
        }, function (error) {
            console.log("Error: " + error.code);
        });
    };

    readGroups = ()=>{
        let readGroups = fire.database().ref('groups');
        readGroups.on("value", (data)=> {
            this.setState({
                groupInfo :data.val()
            })
        }, function (error) {
            console.log("Error: " + error.code);
        });
    };

    handleNavClick =(selectedTab)=>{
        this.setState({
            tab : selectedTab
        })
    };
    handleEventClick = ()=> {
        this.setState({
            tab: 'event'

        })
        localStorage.setItem('avatar',this.state.userInfo.avatar);
        localStorage.setItem('author',this.state.userInfo.username);

    };

    render() {

        let test = ()=>{
            const tab =this.state.tab;
            if (tab==='groups'){
                return <Groups
                    groupInfo = {this.state.groupInfo}
                />
            }
            else if (tab==='events'){
                return <Events
                    eventInfo = {this.state.eventInfo}
                    handleEventClick = {this.handleEventClick}
                />
            }
            else if (tab==='profile'){
                return <Profile
                    userInfo = {this.state.userInfo}
                    uid={this.state.uid}
                />
            }
            else if (tab==='addGroup'){
                return <NewGroup
                    userG = {this.props.user}
                />
            }
            else if (tab==='friends'){
                return <Friends
                    userLoggedIn = {this.props.userLoggedIn}
                />
            }
            else if (tab==='addEvent'){
                return <NewEvent
                    userInfo = {this.state.userInfo}
                />
            }
            else if (tab==='event'){
                return <Event
                    eventInfo = {this.state.eventInfo}
                    userInfo = {this.state.userInfo}

                />
            }

        };

            return (
                <main id="main" className="HolyGrail-body">
                    <div className="mainContainer">
                        <Nav
                        handleNavigation={this.handleNavClick}
                        />
                       {test()}


                    </div>
                </main>
            );

    }

}
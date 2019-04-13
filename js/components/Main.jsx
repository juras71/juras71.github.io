import React from "react";
import Profile from "./Profile.jsx"
import Events from "./Events.jsx"
import Friends from "./Friends.jsx"
import Groups from "./Groups.jsx"
import Chats from "./Chats.jsx"
import Nav from "./Nav.jsx"
import Aside from "./Aside.jsx"
import "./../../css/main.css"
import NewEvent from "./NewEvent.jsx";
import fire from "../config/firebase";
import NewGroup from "./NewGroup.jsx";
import addNewUser from  "./Login.jsx"



export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            tab : 'addEvent',
            userInfo : this.readUsers(),
            groupInfo:this.readGroups(),
            eventInfo: this.readEvents(),

        }
    }
    componentWillMount() {
        console.log(fire.auth().currentUser.uid)
    this.setState({
        uid : fire.auth().currentUser.uid,

    })
    }

    fetchUsers = ()=>{
        fetch(`http://localhost:3000/users/${this.props.user}`).then(r=>r.json()).then(data=>{

            this.setState({
                userInfo: data
            })
        })
    };
    fetchGroups = ()=>{
        fetch("http://localhost:3000/groups/").then(r=>r.json()).then(data=>{
            this.setState({
                groupInfo: data
            })
        })
    };
    fetchEvents = ()=>{
        fetch("http://localhost:3000/events/").then(r=>r.json()).then(data=>{
            this.setState({
                eventInfo: data
            })
        })
    };
    readUsers = ()=>{

        let readUsers = fire.database().ref('users');
        readUsers.on("value", (data)=> {
            console.log('data', data.val())
            {Object.keys(data.val()).map((item ,key, index)=>{
                console.log(data.val()[item].id.toString(),data.val()[item].id.toString()===localStorage.getItem('userid').toString(),localStorage.getItem('userid').toString());

                if (data.val()[item].id.toString()===localStorage.getItem('userid').toString()){
                    console.log('działa');
                    this.setState({
                        userInfo :data.val()[item],
                    })
                }
                else {
                    console.log('nie działa')
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
                    user = {this.props.user}
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
import React from "react";
import fire from "./../config/firebase.js"

export default class Event extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            eventUsers : [],
        }
    }

    joinEvent = () => {
        let eventInfo = this.props.eventInfo[localStorage.getItem('eventID').toString()];
        let userInfo = fire.database().ref('users');
        userInfo.on("value", (data) => {
            {
                Object.keys(data.val()).map((item, key, index) => {
                    if (data.val()[item].id.toString() === localStorage.getItem('userid').toString()) {

                        localStorage.setItem('userKey', item)
                    }

                })
            }
            let addUserEvent = fire.database().ref('users/' + localStorage.getItem('userKey'))
            if (this.props.userInfo.events.indexOf(localStorage.getItem('eventID')) === -1) {
                addUserEvent.update({
                    "events": [...this.props.userInfo.events, localStorage.getItem('eventID').toString()],
                })
            }

            console.log(eventInfo.members.indexOf(this.props.userInfo.id))
            if (eventInfo.members.indexOf(this.props.userInfo.id) === -1) {
                console.log(eventInfo);
                eventInfo.members.push(this.props.userInfo.id);

                let joinEvent = fire.database().ref("events/" + localStorage.getItem('eventID').toString());
                joinEvent.update({
                    "members": [...eventInfo.members],

                })

            } else {
                console.log("nie możesz dołączyć")
            }

        })
    }

    loadMembers = () => {

        let eventInfo = this.props.eventInfo[localStorage.getItem('eventID').toString()];
        let members = eventInfo.members;
        console.log(members);
        let loadMembers = fire.database().ref('users');
        loadMembers.on("value", (data) => {
            let eventUsers = []
            {Object.keys(data.val()).map((item,key, index) => {
                if (members.indexOf(data.val()[item].id.toString())!==-1) {


                    eventUsers.push(data.val()[item]);

                }

            })
                this.setState({
                    eventUsers : eventUsers,
                })
            }
        }, function (error) {
            console.log("Error: " + error.code);
        });
        let slots = document.querySelector(".slots");

        slots.classList.remove("hidden");
    };


    render() {
        let eventInfo = this.props.eventInfo[localStorage.getItem('eventID').toString()];
        console.log(eventInfo.members);
        let userInfo = this.props.userInfo;


        return (
            <div className="HolyGrail-content">

                <ul className="mainContent">
                    <li>
                        <div className="subNav">
                            <button className="subNavBtn" onClick={this.joinEvent}>Dołącz!</button>
                            <button  className="subNavBtn" onClick={this.loadMembers}>Dawaj gienek</button>
                        </div>
                    </li>

                    <li className="evContainer">
                        <h2> {eventInfo.eventName}<img className="sportLogo" alt={eventInfo.sport}
                                                       src={`./images/sports/${eventInfo.sport}.png`}/></h2>
                        <h3>Miasto : {eventInfo.city}</h3>
                        <h3>Data : {eventInfo.time[0]}</h3>

                        <h3>Godzina : {eventInfo.time[1]}</h3>
                        <div className="numInfo">
                            <p>Dyscyplina sportu: {eventInfo.sport}</p>

                            <p>Ilość miejsc: {eventInfo.members[0]}</p>

                            <p>Wolnych miejsc : {parseInt(eventInfo.members[0]) - eventInfo.members.length + 1}</p>

                        </div>

                    </li>

                    <li className="slots hidden">
                        {[...Array(this.state.eventUsers.length)].map((e, i) => <p><img alt={this.state.eventUsers[i].username}
                                                                                               className="eventMember"
                                                                                               key={i}
                                                                                               src={`./images/avatars/${this.state.eventUsers[i].avatar}`}/>
                        <strong>{this.state.eventUsers[i].username}</strong>
                            <span>Jego ulubiony sport to : {this.state.eventUsers[i].sports[0]}</span>
                        </p>)}
                        {[...Array(parseInt(eventInfo.members[0]) - eventInfo.members.length + 1)].map((e, i) => <img
                            alt={eventInfo.sport} className="eventSlot" src={`./images/sports/${eventInfo.sport}.png`}
                            key={i}/>)}
                    </li>
                </ul>
            </div>

        )
    }

}
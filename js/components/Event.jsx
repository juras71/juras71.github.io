import React from "react";
import fire from "./../config/firebase.js"
import "./../../css/event.css"


export default class Event extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            eventUsers: [],
            newComment : [],
            time : []
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

            if (eventInfo.members.indexOf(this.props.userInfo.id) === -1) {
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
        let loadMembers = fire.database().ref('users');
        loadMembers.on("value", (data) => {
            let eventUsers = []
            {
                Object.keys(data.val()).map((item, key, index) => {
                    if (members.indexOf(data.val()[item].id.toString()) !== -1) {


                        eventUsers.push(data.val()[item]);

                    }

                })
                this.setState({
                    eventUsers: eventUsers,
                })
            }
        }, function (error) {
            console.log("Error: " + error.code);
        });
        let slots = document.querySelector(".slots");

        slots.classList.remove("hidden");
    };

    showComments() {
        let evComments = document.querySelector(".eventComments");
        evComments.classList.remove('hidden')

    }
    closeComp (e){
            (e.preventDefault()) ;
            let compDiv=e.currentTarget.parentElement;
            compDiv.classList.add('hidden');

    }

    comment=(e)=>{
        let date = new Date();
        let newComment = [localStorage.getItem('avatar'),e.target.value,date.toLocaleTimeString(),date.toLocaleDateString(),localStorage.getItem('author')];
        this.setState({
            newComment: newComment
        })
    }
    addComment() {
        let comments = fire.database().ref(`events/${localStorage.getItem('eventID')}/comments`)
        let comment = this.state.newComment;
        comments.push(comment)
    }
    render() {
        let eventInfo = this.props.eventInfo[localStorage.getItem('eventID').toString()];
        let date = new Date()
                return (
            <div className="HolyGrail-content">
                <div className="subNav">
                    <button className="subNavBtn chat" onClick={this.showComments}><span className="tooltip">Dyskusja</span> </button>
                    <button className="subNavBtn membersList" onClick={this.loadMembers}><span className="tooltip">Lista członków</span></button>
                    <button className="subNavBtn joinEvent" onClick={this.joinEvent}><span className="tooltip">Dołącz do wydarzenia!</span></button>
                </div>
                <ul className="mainContent">


                    <li className="evContainer">
                        <h2 className="eventName">
                            <img className="sportLogo"
                                 alt={eventInfo.sport}
                                 src={`./images/sports/${eventInfo.sport}.png`}/>
                            {eventInfo.eventName}
                        </h2>

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
                        {[...Array(this.state.eventUsers.length)].map((e, i) =>
                            <div
                                className="userAv"
                            >
                                <img
                            alt={this.state.eventUsers[i].username}
                            className="eventMember"
                            key={i}
                            src={`./images/avatars/${this.state.eventUsers[i].avatar}`}/>
                            <div className="userDetails hidden">
                                <strong>{this.state.eventUsers[i].username}</strong>
                                <span>Jego ulubiony sport to : {this.state.eventUsers[i].sports[0]}</span>

                            </div>

                        </div>)}
                        {[...Array(parseInt(eventInfo.members[0]) - eventInfo.members.length + 1)].map((e, i) => <img
                            alt={eventInfo.sport} className="eventSlot" src={`./images/sports/${eventInfo.sport}.png`}
                            key={i} id={i}/>)}
                        <button className="exitBtn"
                                onClick={(e)=>this.closeComp(e)}>
                        </button>
                    </li>
                    <li className="addComment">
                        <h2 className="commentsHeader">Twój komentarz:</h2>
                        <form onSubmit={(e)=>{e.preventDefault(); this.addComment()}}>
                            <label><textarea placeholder="Tu wpisz swój komentarz" onChange={this.comment}/></label>
                            <button type="submit">Dodaj komentarz</button>
                        </form>
                        <div className="exitBtn"
                             onClick={(e)=>this.closeComp(e)}>

                        </div>
                    </li>
                    <li className="eventComments hidden">
                        <h2 className="commentsHeader">Dyskusja:</h2>
                        {Object.values(eventInfo.comments).reverse().map((item,key, i) => {
                            return (
                                <div className="commentBox">
                                <div className="comment">
                                    <div>
                                        <img className="eventSlot commentAvatar" alt="avatar" src={`./images/avatars/${item[0]}`} key={i}/>

                                        <span className="commentAuthor">{item[4]}</span>
                                    <span className="commentTime">{item[2]},  {item[3]}</span>
                                    </div>
                                    <p className="commentText">{item[1]}</p>
                                </div>


                                   </div>
                            )
                        })}
                        <div className="exitBtn"
                             onClick={(e)=>this.closeComp(e)}>

                        </div>
                    </li>

                </ul>
            </div>

        )
    }

}
//<form onSubmit={(e)=>{e.preventDefault(); this.addComment()}}>
//                                        <label><textarea key={i} placeholder="Tu wpisz swój komentarz" onChange={this.comment}/></label>
//                                         <button type="submit" key={i}  >Dodaj komentarz</button>
//                                         </form>
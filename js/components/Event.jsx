import React from "react";

export default class Event extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        let eventInfo = this.props.eventInfo[localStorage.getItem('eventID').toString()];
        console.log(eventInfo);
        let userInfo = this.props.userInfo;


        return (
            <div className="HolyGrail-content">

                <ul className="mainContent">

                    <li>
                        <h2> {eventInfo.eventName}<img className="sportLogo" alt={eventInfo.sport} src={`./images/sports/${eventInfo.sport}.png`}/></h2>
                        <h3>Miasto : {eventInfo.city}</h3>
                        <h3>Data : {eventInfo.time[0]}</h3>

                        <h3>Godzina : {eventInfo.time[1]}</h3>

                        <h3>Dyscyplina sportu: {eventInfo.sport}</h3>

                        <h3>Ilość miejsc: {eventInfo.members[0]}</h3>

                        <h3>Wolnych miejsc : {parseInt(eventInfo.members[0]) - eventInfo.members.length + 1}</h3>

                        <h3>Dołącz</h3>

                    </li>
                    <li>
                        {[...Array(parseInt(eventInfo.members.length-1))].map((e, i) => <img alt={userInfo.username} className="eventMember"  key={i} src={`./images/avatars/${userInfo.avatar}`}/>)}
                        {[...Array(parseInt(eventInfo.members[0])-eventInfo.members.length+1)].map((e, i) => <img alt={eventInfo.sport} className="eventSlot" src={`./images/sports/${eventInfo.sport}.png`} key={i}/>)}
                    </li>
                </ul>
            </div>

        )
    }

}
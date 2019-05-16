import React from "react";
import "./../../css/events.css"


export default class Events extends React.Component {
    constructor(props) {
        super(props)

    }
    handleEventClick(){
        this.props.handleEventClick();

    }

    render() {
        let eventInfo = this.props.eventInfo;
        return (
            <div className="HolyGrail-content">
                <ul className="mainContent">
                    {Object.keys(eventInfo).map((key, index) => {
                        return (
                            <li key={index} className="evContainer">
                                <img className="sportLogo" alt={eventInfo[key].sport} src={`./images/sports/${eventInfo[key].sport}.png`}/>
                                <h2 className="eventHeader" onClick={()=>{this.handleEventClick(); localStorage.setItem('eventID', key)}}> {eventInfo[key].eventName}</h2>
                                <ul>
                                    <li>
                                        Miasto : {eventInfo[key].city}
                                    </li>
                                    <li>
                                        Data : {eventInfo[key].time[0]}
                                    </li>
                                    <li>
                                        Godzina : {eventInfo[key].time[1]}
                                    </li>
                                    <li>
                                        Dyscyplina sportu: {eventInfo[key].sport}
                                    </li>
                                    <div className="numInfo">
                                        <p>
                                        Maksymalna liczba uczestników : {eventInfo[key].members[0]}
                                    </p>
                                    <p>
                                        Wolnych miejsc : {parseInt(eventInfo[key].members[0]) - eventInfo[key].members.length + 1}
                                    </p>
                                    <p className="slots">
                                        {[...Array(5)].map((e, i) => <img alt={eventInfo.sport} className="eventSlot" src={`./images/sports/${eventInfo[key].sport}.png`} key={i}/>)}
                                    <span className='counter'>{eventInfo[key].members[0]-5}</span>
                                    </p>

                                    </div>

                                </ul>

                            </li>

                        )
                    })}
                </ul>
            </div>
        );
    }

}
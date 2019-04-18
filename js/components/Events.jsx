import React from "react";


export default class Events extends React.Component {
    constructor(props) {
        super(props)

    }
    handleEventClick(){
        this.props.handleEventClick();

    }

    render() {
        let eventInfo = this.props.eventInfo;
        console.log(eventInfo)
        return (
            <div className="HolyGrail-content">
                <ul className="mainContent">
                    {Object.keys(eventInfo).map((key, index) => {
                        return (
                            <li key={index}>
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
                                    <li>
                                        Maksymalna liczba uczestników : {eventInfo[key].members[0]}
                                    </li>
                                    <li>
                                        Wolnych miejsc : {parseInt(eventInfo[key].members[0]) - eventInfo[key].members.length + 1}
                                    </li>
                                    <li>
                                        Dołącz
                                    </li>

                                </ul>

                            </li>

                        )
                    })}
                </ul>
            </div>
        );
    }

}
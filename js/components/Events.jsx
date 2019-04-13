import React from "react";
import NewEvent from "./NewEvent.jsx"

export default class Events extends React.Component {
    constructor(props) {
        super(props)

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
                                <h2> {eventInfo[key].eventName}</h2>
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
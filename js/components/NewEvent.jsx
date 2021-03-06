import React from "react";
import "./../../css/newEvent.css"
import fire from "./../config/firebase.js"

export default class NewEvent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            eventName: '',
            sport: '',
            adress: '',
            date: '',
            time: '',
            members: [],
            comments: [],


        }

    }

    handleNameChange = (event) => {
        this.setState({eventName: event.target.value});
        localStorage.setItem('eventName', event.target.value)
    };
    handleAdressChange = (event) => {
        this.setState({city: event.target.value});
    };
    handleDateChange = (event) => {
        this.setState({date: [event.target.value]});
    };
    handleTimeChange = (event) => {
        this.setState({time: [event.target.value]});
    };
    handleMembersChange = (event) => {
        this.setState({members: [event.target.value]});
    };
    handleSportChange = (event) => {
        this.setState({sport: event.target.value});
    };
    fetchPostNewEvent = (event) => {
        event.preventDefault();
        let submitNewEventBtn = document.getElementById('submitNewEventBtn');
        console.log(submitNewEventBtn);
        submitNewEventBtn.disabled = true;
        submitNewEventBtn.style.animation = 'loading 2s 0s 1 none ';
        setTimeout(() => {
            submitNewEventBtn.style.display = 'none';
        }, 1500);

        let date = new Date();
        let intro = [
            localStorage.getItem('avatar'),
            `Witaj w wydarzeniu ${localStorage.getItem('eventName')}! Jeśli jesteś zainteresowany dołączeniem naciśnij zielony przycisk +`,
            date.toLocaleTimeString(),
            date.toLocaleDateString(),
            localStorage.getItem('author')];

        const newEvent = {
            eventName: this.state.eventName,
            sport: this.state.sport,
            city: this.state.city,
            time: [this.state.date, this.state.time],
            members: [this.state.members, this.props.userInfo.id],
            admin: this.props.userInfo.id,
            comments: [intro,],
        };


        let addEvent = fire.database().ref('events');
        let newEv = addEvent.push(newEvent);
        console.log(newEv.key);
        this.setState({
            eventName: '',
            sport: '',
            city: '',
            time: '',
            members: '',
            admin: '',
        });

    };

    render() {

        return <div className="HolyGrail-content">
            <ul className="mainContent">
                <li>
                    <h2 className="addNewEvent">Dodaj nowe wydarzenie</h2>
                    <form onSubmit={this.fetchPostNewEvent}>
                        <ul className="newGroupForm">
                            <li><label><h6
                            >Nazwa :</h6
                            >
                                <input
                                    type="text"
                                    value={this.state.eventName}
                                    onChange={this.handleNameChange}
                                /></label></li>
                            <li><label><h6
                            >Miejsce:</h6
                            >
                                <input
                                    type="text"
                                    value={this.state.city}
                                    onChange={this.handleAdressChange}
                                /></label></li>
                            <li className="eventDate">
                                <label
                                    className="dateTime"
                                ><h6
                                >Data:</h6
                                >
                                    <input
                                        type="date"
                                        value={this.state.date}
                                        onChange={this.handleDateChange}

                                    /></label>
                                <label
                                    className="dateTime"
                                ><h6
                                >Czas:</h6
                                >
                                    <input
                                        type="time"
                                        value={this.state.time}
                                        onChange={this.handleTimeChange}

                                    /></label></li>
                            <li
                                className="eventDate"
                            ><label
                                className="dateTime"
                            ><h6
                            >Ilość graczy:</h6
                            >
                                <input
                                    type="number"
                                    value={this.state.members}
                                    onChange={this.handleMembersChange}
                                /> </label>
                                <label
                                    className="dateTime"
                                ><h6
                                >Sport:</h6
                                >
                                    <select
                                        name="sports"
                                        className="chooseSport"
                                        value={this.state.sport}
                                        onInput={this.handleSportChange}
                                    >
                                        <option value="-">-</option>
                                        <option value="football">Piłka nożna</option>
                                        <option value="basketball">Koszykówka</option>
                                        <option value="tennis">Tenis ziemny</option>
                                        <option value="swimming">Pływanie</option>
                                        <option value="volleyball">Siatkówka</option>
                                        <option value="squash">Squash</option>
                                        <option value="golf">Golf</option>
                                        <option value="handball">Piłka ręczna</option>
                                        <option value="hockey">Hokej</option>
                                        <option value="running">Bieganie</option>
                                    </select>
                                </label>
                            </li>
                            <li><label><h2 className="hidden">Gratulacje! Właśnie dodałeś nowe wydarzenie o
                                nazwie: {this.state.eventName}</h2><input type="submit" id="submitNewEventBtn"
                                                                          value="&#x271A;"/></label>
                            </li>
                        </ul>
                    </form>
                </li>
            </ul>
        </div>
    }
}
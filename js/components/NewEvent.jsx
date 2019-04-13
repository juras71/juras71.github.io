import React from "react";
import "./../../css/newEvent.css"
import fire from "./../config/firebase.js"

export default class NewEvent extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            eventName : '',
            sport: '',
            adress: '',
            date: '',
            time:'',
            members: [],


        }

    }
    handleNameChange = (event) => {
        this.setState({eventName: event.target.value});
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
    fetchPostNewEvent = (event)=>{
        event.preventDefault();
        const newEvent = {
            eventName : this.state.eventName,
            sport: this.state.sport,
            city: this.state.city,
            time: [this.state.date,this.state.time],
            members: [this.state.members,this.props.user],
            admin: this.props.user,
        };


        let addEvent = fire.database().ref('events');
        let newEv  = addEvent.push(newEvent);
        console.log(newEv.key);

    };
    render() {

        return <div  className="HolyGrail-content">
            <ul className="mainContent">
                <li>
                    <h2 className="addNewEvent">Dodaj nowe wydarzenie</h2>
                    <form onSubmit={this.fetchPostNewEvent}>
                        <ul className="newGroupForm">
                            <li><label>Nazwa :
                                <input
                                type="text"
                                value={this.state.eventName}
                                onChange={this.handleNameChange}
                            /></label></li>
                            <li><label>Miejsce:
                                <input
                                    type="text"
                                    value={this.state.city}
                                    onChange={this.handleAdressChange}
                                /></label></li>
                            <li><label>Data:
                                <input
                                type="date"
                                value={this.state.date}
                                onChange={this.handleDateChange}
                            /></label></li>
                            <li><label>Czas:
                                <input
                                    type="time"
                                    value={this.state.time}
                                    onChange={this.handleTimeChange}
                                /></label></li>
                            <li><label>Ilość graczy:
                                <input
                                type="number"
                                value={this.state.members}
                                onChange={this.handleMembersChange}
                                /> </label></li>
                            <li><label>Sport:
                                <select
                                    name="sports"
                                    className="chooseSport"
                                    value={this.state.sport}
                                    onChange={this.handleSportChange}
                                >
                                    <option value="football">Football</option>
                                    <option value="basketball">Basketball</option>
                                    <option value="tennis">Tennis</option>
                                    <option value="swimming">Swimming</option>
                                </select>
                            </label>
                            </li>
                            <li><label><input type="submit"  id="submitNewEventBtn" value="&#x271A;"/></label>
                            </li>
                        </ul>
                    </form>
                </li>
            </ul>
        </div>
    }
}
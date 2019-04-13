import React from "react";
import "./../../css/newGroup.css"
import fire from "./../config/firebase.js"

export default class NewGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            groupName : '',
            sport: '',
            city: '',
            date: '',
            time:'',
            members: [],


        }

    }
    handleNameChange = (event) => {
        this.setState({groupName: event.target.value});
    };
    handleCityChange = (event) => {
        this.setState({city: event.target.value});
    };


    handleSportChange = (event) => {
        this.setState({sport: event.target.value});
    };
    fetchPostNewGroup = (event)=>{
        event.preventDefault();
        const newGroup = {
            groupName : this.state.groupName,
            sport: this.state.sport,
            city: this.state.city,
            members: [this.props.userG],
            admin: this.props.userG,
        };


        let addGroup = fire.database().ref('groups');
        let newGr  = addGroup.push(newGroup);
        console.log(newGr.key);

    };
    render() {

        return <div  className="HolyGrail-content">
            <ul className="mainContent">
                <li>
                    <h2 className="addNewGroup">Dodaj nową grupę</h2>
                    <form onSubmit={this.fetchPostNewGroup}>
                        <ul className="newGroupForm">
                            <li><label>Nazwa :
                                <input
                                    type="text"
                                    value={this.state.groupName}
                                    onChange={this.handleNameChange}
                                /></label></li>
                            <li><label>Miasto:
                                <input
                                    type="text"
                                    value={this.state.city}
                                    onChange={this.handleCityChange}
                                /></label></li>
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
                            <li><label><input type="submit"  id="submitNewGroup" value="&#x271A;"/></label>
                            </li>
                        </ul>
                    </form>
                </li>
            </ul>
        </div>
    }
}
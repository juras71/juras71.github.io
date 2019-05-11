import React from "react";
import "./../../css/groups.css"
export default class Groups extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
        let groupInfo = this.props.groupInfo;
        return (
            <div className="HolyGrail-content">
                <ul className="mainContent">
                        {Object.keys(groupInfo).map((item ,index)=>{
                            return (
                            <li key={index}>
                                <h2> {groupInfo[item].groupName}</h2>
                                <ul>
                                    <li>
                                        Dyscyplina sportu: {groupInfo[item].sport}
                                    </li>

                                    <li>
                                        Miasto : {groupInfo[item].city}
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
import React from "react";
import "../../css/profile.css"
import "./../../images/avatars/avat1.png"
import "./../../images/avatars/avat2.png"

export default class Profile extends React.Component {
    constructor(props) {
        super(props)

    }


    render() {
        let userInfo = this.props.userInfo;
        return (
            <div className="HolyGrail-content">
                <ul className="mainContent">
                    <li>
                        <h1 className="profileHeader"><img src={`./images/avatars/${userInfo.avatar}`} alt="avatar" className="avatar"/>
                            {userInfo.username}
                        </h1>
                    </li>
                    <li>
                        Wiek: {userInfo.age}
                    </li>
                    <li>
                        Ulubione sporty: {userInfo.sports.map((item, index) => {
                        return <strong key={index}>{item}</strong>
                    })}
                    </li>
                    <li>
                        Grupy : {userInfo.groups.map((item,index)=>{
                            return <p key={index}>{item}</p>
                    })}
                    </li>
                </ul>
            </div>
        );
    }

}
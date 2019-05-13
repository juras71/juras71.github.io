import React from "react";
import "./../../css/header.css"


export default class Header extends React.Component{
    constructor(props){
        super(props)
    }

    render() {

            return (
                <header id="header">
                    <div className="mainContainer">

                        <h1>
                            TeamMates
                        </h1>
                    </div>
                </header>
            );
        }

}
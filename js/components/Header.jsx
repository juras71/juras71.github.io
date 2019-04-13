import React from "react";
import "./../../images/logo.png"

export default class Header extends React.Component{
    constructor(props){
        super(props)
    }

    render() {

            return (
                <header id="header">
                    <div className="mainContainer">
                        <img src='./images/logo.png' alt="logo" id="logo" />
                        <h1>
                            Find the playah!
                        </h1>
                    </div>
                </header>
            );
        }

}
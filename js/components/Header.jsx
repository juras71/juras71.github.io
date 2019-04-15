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
                        <img src='./images/logo.png' alt="logo" className="logo" />
                        <h1>
                            TEAMMATES
                        </h1>
                    </div>
                </header>
            );
        }

}
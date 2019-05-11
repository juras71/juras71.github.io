import React from "react";
import "./../../css/footer.css"

export default class Footer extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        return (
            <footer id="footer">
                <div className="mainContainer">
                    <h3>Copyrights 	&copy; Kornel Kowalski</h3>
                </div>
            </footer>
        );
    }

}
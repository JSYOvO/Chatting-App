import React from "react";

// import onlineIcon from "../../icons/onlineIcon.png";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./InfoBar.css";

const InfoBar = ({ room, callback }: any) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <h1>ROOM {room}</h1>
            </div>
            <div className="rightInnerContainer" onClick={callback}>
                <a href="/">
                    <ArrowBackIcon />
                </a>
            </div>
        </div>
    );
};

export default InfoBar;

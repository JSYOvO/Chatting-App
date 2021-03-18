import React from "react";

// import onlineIcon from "../../icons/onlineIcon.png";
// import closeIcon from "../../icons/closeIcon.png";

import "./InfoBar.css";

const InfoBar = ({ room }: any) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <h1>ROOM {room}</h1>
        </div>
        <div className="rightInnerContainer">
            <a href="/">
                {/* <img src={closeIcon} alt="close icon" /> */}
            </a>
        </div>
    </div>
);

export default InfoBar;

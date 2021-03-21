import React from "react";

import "./Message.css";

// import ReactEmoji from "react-emoji";
interface IMessage {
    user: string;
    text: string;
}
interface Message {
    message: IMessage;
    name: string;
}
const Message = ({ message, name }: Message) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if (message?.user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return isSentByCurrentUser ? (
        <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{trimmedName}</p>
            <div className="messageBox backgroundBlue maxWidth">
                <p className="messageText colorDark">
                    {message?.text}
                </p>
            </div>
        </div>
    ) : message?.user === "admin" ? (
        <div className="messageTextAdmin">{message?.text}</div>
    ) : (
        <div className="messageContainer justifyStart">
            <div className="messageBox backgroundDark maxWidth">
                <p className="messageText colorWhite">
                    {message?.text}
                </p>
            </div>
            <p className="sentText pl-10 ">{message?.user}</p>
        </div>
    );
};

export default Message;

import React from "react";

// import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";

import "./Messages.css";
interface IMessage {
    user: string;
    text: string;
}
interface IMessages {
    messages: IMessage[];
    name: string;
}

const Messages = ({ messages, name }: IMessages) => {
    // <ScrollToBottom className="messages">

    console.log(messages, name);
    return (
        <div>
            {messages?.map((message, i) => (
                <div key={i}>
                    <Message message={message} name={name} />
                </div>
            ))}
        </div>
    );

    // </ScrollToBottom>
};

export default Messages;

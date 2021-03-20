import React, { useEffect } from "react";

// import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";

import "./Messages.css";
interface IMessage {
    user: string;
    text: string;
}
interface Messages {
    messages: IMessage[];
    name: string;
}
const Messages = ({ messages, name }: Messages) => {
    // <ScrollToBottom className="messages">
    const messagesRef = React.useRef<HTMLDivElement>(null);

    console.log(messages);
    useEffect(() => {
        messagesRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return (
        <div ref={messagesRef}>
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

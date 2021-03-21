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
    const messageContainer = React.createRef<HTMLDivElement>();

    useEffect(() => {
        const scroll =
            messageContainer?.current?.scrollHeight! -
            messageContainer?.current?.clientHeight!;
        messageContainer?.current?.scrollTo(0, scroll);
        console.log("scroll", scroll);
        console.log(
            "messageContainer?.current?",
            messageContainer?.current
        );
    }, [messages]);

    return (
        <div ref={messageContainer} className="messages">
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

import queryString from "query-string";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import "./Chat.css";

let socket: any;

interface IMessage {
    user: string;
    text: string;
}
interface Chat {}

const Chat: React.FC<Chat> = ({ location }: any) => {
    const [name, setName] = useState<string>("");
    const [room, setRoom] = useState<string>("");
    const [users, setUsers] = useState<string>("");
    const [message, setMessage] = useState<IMessage>();
    const [messages, setMessages] = useState<IMessage[]>();

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io.connect("http://localhost:4000");
        name && setName(name as string);
        room && setRoom(room as string);

        socket.emit("join", { name, room }, (error: any) => {
            if (error) {
                alert(error);
            }
        });
    }, [location.search]);

    useEffect(() => {
        console.log("NEW MESSAGE COLLECTING");
        socket.on("message", (message: IMessage) => {
            console.log(messages);
            setMessages((messages) => [...messages!, message]);
        });
        socket.on("roomData", ({ room, users }: any) => {
            console.log(room, users);
        });
    }, []);

    const sendMessage = (event: any) => {
        event.preventDefault();
        console.log("send", name, message);
        if (message) {
            socket.emit("sendMessage", message);
        }
    };

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages!} name={name} />
                <Input
                    message={message!}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
};

export default Chat;

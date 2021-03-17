import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import "./Chat.css";

const socket = io.connect("http://localhost:4000");

interface IMessage {
    name: string;
    message: string;
}
interface Chat {}

const Chat: React.FC<Chat> = ({}) => {
    const [state, setState] = useState<IMessage>({
        message: "",
        name: "",
    });
    const [chat, setChat] = useState<IMessage[]>([]);

    useEffect(() => {
        socket.on("message", ({ name, message }: IMessage) => {
            setChat([...chat, { name, message }]);
        });
    }, [state]);

    const onTextChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const onMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, message } = state;
        socket.emit("message", { name, message });
        setState({ message: "", name });
    };

    const renderChat = () => {
        return chat.map(({ name, message }, index) => (
            <div key={index}>
                <h3>
                    {name}: <span>{message}</span>
                </h3>
            </div>
        ));
    };

    return (
        <div className="chat">
            <div className="chat__container">
                <div className="render-chat">{renderChat()}</div>
                <form
                    className="render-msg"
                    onSubmit={onMessageSubmit}
                >
                    <TextField
                        name="message"
                        onChange={(e) => onTextChange(e)}
                        value={state.message}
                        id="outlined-multiline-static"
                        variant="outlined"
                        label="Message"
                    />
                    <button>Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Chat;

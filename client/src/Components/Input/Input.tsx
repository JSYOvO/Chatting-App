import React from "react";
import "./Input.css";

interface IMessage {
    user: string;
    text: string;
}

interface Input {
    message: IMessage;
    setMessage: React.Dispatch<
        React.SetStateAction<IMessage | undefined>
    >;
    sendMessage: (event: any) => void;
}

const Input: React.FC<Input> = ({
    message,
    setMessage,
    sendMessage,
}: any) => {
    return (
        <form className="form">
            <input
                className="input"
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={({ target: { value } }) =>
                    setMessage(value)
                }
                onKeyPress={(event) =>
                    event.key === "Enter" ? sendMessage(event) : null
                }
            />
            <button
                className="sendButton"
                onClick={(e) => sendMessage(e)}
            >
                Send
            </button>
        </form>
    );
};

export default Input;

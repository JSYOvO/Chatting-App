import { TextField } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import "./App.css";

function App() {
    const [state, setState] = useState({ message: "", name: "" });
    const [chat, setChat] = useState([]);
    const socketRef = useRef();

    // useEffect(() => {
    //     socketRef?.current? = io("http://localhost:4000");
    //     socketRef?.current?("message", ({ name, message }: any) => {
    //         setChat([...chat, { name, message }]);
    //     });
    //     return () => socketRef?.current?.disconnect();
    // }, [chat]);

    // const onTextChange = (e) => {
    //     setState({ ...state, [e.target.name]: e.target.value });
    // };

    // const onMessageSubmit = (e) => {
    //     const { name, message } = state;
    //     socketRef.current.emit("message", { name, message });
    //     e.preventDefault();
    //     setState({ message: "", name });
    // };

    // const renderChat = () => {
    //     return chat.map(({ name, message }, index) => (
    //         <div key={index}>
    //             <h3>
    //                 {name}: <span>{message}</span>
    //             </h3>
    //         </div>
    //     ));
    // };

    return (
        <div className="card">
            <form
            // onSubmit={onMessageSubmit}
            >
                <h1>Messanger</h1>
                <div className="name-field">
                    <TextField
                        name="name"
                        // onChange={(e) => onTextChange(e)}
                        value={state.name}
                        label="Name"
                    />
                </div>
                <div>
                    <TextField
                        name="message"
                        // onChange={(e) => onTextChange(e)}
                        value={state.message}
                        id="outlined-multiline-static"
                        variant="outlined"
                        label="Message"
                    />
                </div>
                <button>Send Message</button>
            </form>
            <div className="render-chat">
                <h1>Chat Log</h1>
                {/* {renderChat()} */}
            </div>
        </div>
    );
}

export default App;

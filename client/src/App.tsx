// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import TextField from "@material-ui/core/TextField";
// import "./App.css";

// const socket = io.connect("http://localhost:4000");

// interface IMessage {
//     name: string;
//     message: string;
// }

// function App() {
//     const [room, setRoom] = useState<String>("");
//     const [state, setState] = useState<IMessage>({
//         message: "",
//         name: "",
//     });
//     const [chat, setChat] = useState<IMessage[]>([]);

//     useEffect(() => {
//         socket.on("message", ({ name, message }: IMessage) => {
//             setChat([...chat, { name, message }]);
//         });
//     }, [state]);

//     const onTextChange = (
//         e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
//     ) => {
//         e.target.name !== "room"
//             ? setState({ ...state, [e.target.name]: e.target.value })
//             : setRoom(e.target.value);
//     };

//     const onMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const { name, message } = state;
//         socket.emit("message", { name, message });
//         setState({ message: "", name });
//     };

//     const onRoomSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         socket.emit("joinRoom", room);
//         setRoom("");
//     };

//     const renderChat = () => {
//         return chat.map(({ name, message }, index) => (
//             <div key={index}>
//                 <h3>
//                     {name}: <span>{message}</span>
//                 </h3>
//             </div>
//         ));
//     };

//     return (
//         <div className="card">
//             <form onSubmit={onRoomSubmit}>
//                 <h1>Room</h1>
//                 <div className="name-field">
//                     <TextField
//                         name="room"
//                         onChange={(e) => onTextChange(e)}
//                         value={room}
//                         label="Room"
//                     />
//                 </div>
//                 <button>Join Room</button>
//             </form>
//             <form onSubmit={onMessageSubmit}>
//                 <div className="name-field">
//                     <TextField
//                         name="name"
//                         onChange={(e) => onTextChange(e)}
//                         value={state.name}
//                         label="Name"
//                     />
//                 </div>
//                 <div>
//                     <TextField
//                         name="message"
//                         onChange={(e) => onTextChange(e)}
//                         value={state.message}
//                         id="outlined-multiline-static"
//                         variant="outlined"
//                         label="Message"
//                     />
//                 </div>
//                 <button>Send Message</button>
//             </form>
//             <div className="render-chat">
//                 <h1>Chat Log</h1>
//                 {renderChat()}
//             </div>
//         </div>
//     );
// }

// export default App;

import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Chat from "./Components/Chat/Chat";
import Join from "./Components/Join/Join";
interface App {}

const App: React.FC<App> = ({}) => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Join} />
            <Route path="/chat" component={Chat} />
        </BrowserRouter>
    );
};

export default App;

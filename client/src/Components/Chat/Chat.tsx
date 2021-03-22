import queryString from "query-string";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./Chat.css";

let socket: any;

interface IMessage {
    user: string;
    text: string;
}
interface Chat {}
const SERVER_URL = `https://heroku-chattingweb-wotjq5113.herokuapp.com/`;

const Chat: React.FC<Chat> = ({ location }: any) => {
    const [name, setName] = useState<string>("");
    const [room, setRoom] = useState<string>("");
    const [users, setUsers] = useState<string>("");
    const [message, setMessage] = useState<IMessage>();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isDup, setIsDup] = useState<boolean>(false);
    const [dupChecked, setDupChecked] = useState<boolean>(false);
    const dupInputRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io.connect(SERVER_URL);
        name && setName(name as string);
        room && setRoom(room as string);
        socket.emit("join", { name, room }, (error: any) => {
            if (error) {
                alert(error);
            }
        });
    }, [location.search]);

    useEffect(() => {
        socket.on("message", (message: IMessage) => {
            setMessages((messages?) => [...messages!, message]);
        });
        socket.on("roomData", ({ room, users }: any) => {
            console.log("roomData", room, users);
        });
        socket.on("duplicate", () => {
            console.log("duplicate");
            setIsDup(true);
            setName("");
            dupInputRef?.current?.focus();
        });
        socket.on("non-duplicate", () => {
            console.log("non-duplicate");
            setDupChecked(true);
        });
    }, []);

    const sendMessage = (event: any) => {
        event.preventDefault();
        console.log("send", name, message);
        if (message) {
            socket.emit("sendMessage", message);
        }
    };

    const checkDup = () => {
        socket.emit("validateID", { name, room });
    };

    const handleClickBack = () => {
        console.log("LOGOUT!!");
        socket.emit("out", { name, room });
    };

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} callback={handleClickBack} />
                <Messages messages={messages!} name={name} />
                <Input
                    message={message!}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
            <Dialog
                open={isDup}
                // onClose={() => setIsDup(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Your nickname has been set.
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Set a new nickname and check the duplicate
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="name"
                        type="text"
                        value={name}
                        fullWidth
                        color="secondary"
                        ref={dupInputRef}
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={(e) => checkDup()}
                        color="primary"
                    >
                        Check Duplicate
                    </Button>
                    <Button
                        onClick={() => {
                            setIsDup(false);
                            socket.emit(
                                "join",
                                { name, room },
                                (error: any) => {
                                    if (error) {
                                        alert(error);
                                    }
                                }
                            );
                        }}
                        color="primary"
                        disabled={!dupChecked}
                    >
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Chat;

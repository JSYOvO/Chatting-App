import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Join.css";
interface Join {}

const Join: React.FC<Join> = ({}) => {
    const [name, setName] = useState<string>("");
    const [room, setRoom] = useState<string>("");

    return (
        <div className="join">
            <div className="joinInnerContainer">
                <h1 className="heading">WelCome!!</h1>
                <div>
                    <input
                        placeholder="Name"
                        className="joinInput"
                        type="text"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <input
                        placeholder="Room"
                        className="joinInput mt-20"
                        type="text"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setRoom(event.target.value)}
                    />
                </div>
                <Link
                    onClick={(
                        e: React.MouseEvent<
                            HTMLAnchorElement,
                            MouseEvent
                        >
                    ) => (!name || !room ? e.preventDefault() : null)}
                    to={`/chat?name=${name}&room=${room}`}
                >
                    <button className={"button mt-20"} type="submit">
                        Sign In
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Join;

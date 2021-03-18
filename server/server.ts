// import { Mongo } from "./database/Database";
// import express from "express";
// import http from "http";
// export class Server {
//     constructor(private mongo: Mongo = new Mongo()) {}

//     public async Start(): Promise<void> {
//         this.mongo.Connect();

//         const app = express();
//         const httpServer = http.createServer(app);
//         const io = require("socket.io")(httpServer);

//         app.get("/", (_, res) => {
//             res.send("hello");
//         });
//         app.listen({ port: 4400 }, () => {
//             console.log("server started on localhost:4000");
//         });
//     }
// }

// new Server().Start().catch((err) => console.error(err));

import { Mongo } from "./database/Database";

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
import { addUser, getUser, getUsersInRoom } from "./user";

export class Server {
    constructor(private mongo: Mongo = new Mongo()) {}
    public async Start() {
        io.on("connection", (socket: any) => {
            let lastRoom: string = "";

            // socket.on("joinRoom", (room: string) => {
            //     console.log(`${room} JOIN`);
            //     if (lastRoom !== "") socket.leave(lastRoom);
            //     if (room !== "") socket.join(room);
            // });

            socket.on("sendMessage", (message: string) => {
                const user = getUser(socket.id);

                if (!lastRoom) {
                    // io.emit("message", {
                    //     name,
                    //     message,
                    // });
                    // console.log(
                    //     "getMessage",
                    //     user?.room,
                    //     socket.id,
                    //     message
                    // );
                    io.to(user?.room).emit("message", {
                        user: user?.name,
                        text: message,
                    });
                }
            });

            socket.on(
                "join",
                ({ name, room }: any, callback: (e: any) => {}) => {
                    console.log("join", name, room);
                    const { error, user } = addUser({
                        id: socket.id,
                        name,
                        room,
                    });

                    if (error) return callback(error);

                    socket.join(room);

                    socket.emit("message", {
                        name: "admin",
                        message: `${name} has joined room ${room}.`,
                    });

                    // io.to(room).emit("message", {
                    //     name: "admin",
                    //     message: `${name} has joined!`,
                    // });

                    io.to(room).emit("roomData", {
                        room: room,
                        users: getUsersInRoom(user?.room),
                    });

                    // callback();
                }
            );
        });

        http.listen("4000", () => {
            console.log(`Server is running on port 4000`);
        });
    }
}

new Server().Start();

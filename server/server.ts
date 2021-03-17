// import { Mongo } from "./database/Database";
// import express from "express";
// import http from "http";

import { Mongo } from "./database/Database";

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

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

interface IChat {
    name: string;
    message: string;
}

export class Server {
    constructor(private mongo: Mongo = new Mongo()) {}
    public async Start() {
        io.on("connection", (socket: any) => {
            let lastRoom: string = "";

            socket.on("joinRoom", (room: string) => {
                console.log(`${room} JOIN`);
                if (lastRoom !== "") socket.leave(lastRoom);
                if (room !== "") socket.join(room);
            });

            socket.on("message", ({ name, message }: IChat) => {
                console.log("getMessage");
                if (!lastRoom) {
                    io.emit("message", {
                        name,
                        message,
                    });
                }
            });
        });

        http.listen("4000", () => {
            console.log(`Server is running on port 4000`);
        });
    }
}

new Server().Start();

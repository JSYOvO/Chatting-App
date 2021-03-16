import { Mongo } from "./database/Database";
import express from "express";
import http from "http";

export class Server {
    constructor(private mongo: Mongo = new Mongo()) {}

    public async Start(): Promise<void> {
        this.mongo.Connect();

        const app = express();
        const httpServer = http.createServer(app);
        const io = require("socket.io")(httpServer);

        app.get("/", (_, res) => {
            res.send("hello");
        });
        app.listen({ port: 4400 }, () => {
            console.log("server started on localhost:4000");
        });
    }
}

new Server().Start().catch((err) => console.error(err));

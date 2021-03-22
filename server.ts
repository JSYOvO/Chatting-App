const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
import {
    addUser,
    checkDup,
    deleteUser,
    getUser,
    getUsersInRoom,
} from "./user";

interface IUser {
    id: string;
    name: string;
    room: string;
}
const PORT = process.env.PORT || 4000;

export class Server {
    constructor() {} // private mongo: Mongo = new Mongo()
    public async Start() {
        io.on("connection", (socket: any) => {
            let lastRoom: string = "";

            socket.on("sendMessage", (message: string) => {
                const user = getUser(socket.id);

                if (!lastRoom) {
                    io.to(user?.room).emit("message", {
                        user: user?.name,
                        text: message,
                    });
                }
            });

            socket.on("validateID", ({ name, room }: any) => {
                const { error, existingUser } = checkDup({
                    id: socket.id,
                    name,
                    room,
                });

                console.log(existingUser, error);

                if (error) {
                    socket.emit("duplicate");
                } else {
                    socket.emit("non-duplicate");
                }
                return;
            });

            socket.on("out", ({ name, room }: any) => {
                deleteUser({ id: socket.id, name, room });
                io.to(room).emit("message", {
                    user: "admin",
                    text: `${name} has joined left ${room}.`,
                });
                return;
            });

            socket.on(
                "join",
                ({ name, room }: any, callback: (e: any) => {}) => {
                    const { error, user } = addUser({
                        id: socket.id,
                        name,
                        room,
                    });

                    if (error) {
                        socket.emit("duplicate");
                        return;
                    }

                    socket.join(room);

                    io.to(user?.room).emit("message", {
                        user: "admin",
                        text: `${name} has joined room ${room}.`,
                    });

                    io.to(room).emit("roomData", {
                        room: room,
                        users: getUsersInRoom(user?.room),
                    });
                }
            );
        });

        http.listen(PORT, () => {
            console.log(`Server is running on port 4000`);
        });
    }
}

new Server().Start();

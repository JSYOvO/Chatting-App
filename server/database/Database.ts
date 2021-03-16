import mongoose from "mongoose";
import { DB_URL } from "./Config";

export class Mongo {
    constructor(private url: string = DB_URL) {}

    public Connect(): void {
        mongoose.connect(
            this.url,
            { useNewUrlParser: true },
            (e: unknown) => {
                if (e) {
                    console.log(`Unable to connect ` + e);
                } else {
                    console.log(`Connected to the database`);
                }
            }
        );
    }
}

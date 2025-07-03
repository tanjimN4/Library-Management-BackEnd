import mongoose from "mongoose";
import dotenv from 'dotenv';
import app from "./app";
dotenv.config();

const url = process.env.MONGODB_URL;

const port = 5000;
const server = async () => {
    try {
        await mongoose.connect(url as string);
        console.log('Database Connected Successfully');

        app.listen(port, () => {
            console.log('Library Management API SERVER IS RUNNING ON PORT', port);

        })
    } catch (error) {
        console.log(error);

    }
}

server()
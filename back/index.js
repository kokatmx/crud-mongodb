import express from "express";
import dotenv from "dotenv";
import { connectToMongo } from "./config.js";
import { router } from "./route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import booksRoute from "./booksRoute.js";

const app = express();
// app.use(cors())
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true, // enable credentials (cookies, authorization headers)
    })
);
dotenv.config();
app.use(express.json());
app.use(cookieParser());
connectToMongo();
app.use(router);
app.use("/books", booksRoute);

const port = 5555;
app.listen(port, () => {
    console.log("connected to port:" + port);
});

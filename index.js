import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";


import connect from "./dbConnect/connection.js";
import tweetsRoute from "./routes/tweetsRoute.js"
import authRoute from "./routes/authRoute.js";
import usersRoute from "./routes/usersRoute.js"
import { errorHandler } from "./middleware/error.js";

const app = express();
dotenv.config()

connect();

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/tweets", tweetsRoute);
app.use("api/users", usersRoute)

app.use(errorHandler)
const port = process.env.PORT || 3000;


app.listen(port, () => console.log(`Server listening on ${port}`))
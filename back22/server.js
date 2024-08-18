import express from "express";
import mongoose from "./db/db.js";
import router from "./router/index.js";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
// import { Server } from "socket.io";
import session from "express-session";
import passport from "passport";

const app = express();

dotenv.config({ path: "./.env" });

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.authenticate("session"));

app.use(router);

const server = http.createServer(app);

// app.use("*", (req, res) => {
//   res.status(404).json({ message: "route not found" });
// });

app.get("*", (req, res) => {
  res.json("route not found");
});

server.listen(1450, () => {
  console.log("run at 1450");
});

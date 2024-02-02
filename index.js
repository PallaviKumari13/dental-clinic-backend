const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { register, login, findUsers } = require("./src/Controllers/auth");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { verifytoken, validateForm, isValidated } = require("./src/Middlewares");
const { sendEmail } = require("./src/Helper/Email");
const { addForm } = require("./src/Controllers/Form");


const app = http.createServer(server);
const io = new Server(app);

server.use(express.json());
server.use(cors());
require('dotenv').config();

server.get("/", (req, res) => {
    res.status(200).json({
        name: "Park",
        age: 20
    });
});

server.post("/register", register, sendEmail);
server.post("/login", login);
server.get("/get-user", verifytoken, findUsers);
server.post("/form", validateForm, isValidated, addForm);

io.on("connection", socket => {
    console.log("New user connected");

    socket.on("message", (message, room) => {
        console.log(`New message received in ${room} and message is ${message}`);
        socket.to(room).emit("message", message);
    });

    socket.on("join", (room) => {
        console.log(room);
        socket.join(room);
        socket.emit("joined");
    });
});

// Move the listen call here
app.listen( 3000, () => {
    console.log('Connected to port');
});

// For connecting to the database
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database Connected");
}).catch((error) => {
    console.log(error);
});

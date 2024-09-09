import express from "express";
import connect from "./db.js";
import dotenv from "dotenv"
import passport from "passport";
import passportSetup from './confige/passportjs.js'
import session from 'express-session';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors"
import { Server as SocketIO } from "socket.io";
import http from "http";
import authRoute from "./routes/authRoutes.js"
import employeeRoute from './routes/jobPortal/employee.js'
import employerRoute from './routes/jobPortal/employer.js'
import JobSeekerRoute from './routes/jobPortal/jobSeeker.js'
import MatrimonyProfileRoute from './routes/matrimony/profile.js'
import ConversationRoutesOfMatrimony from './routes/matrimony/chat/conversation.js'
import MessageRouteOfMatrimony from './routes/matrimony/chat/message.js'


import morgan from "morgan";
import Profile from "./models/MatrimonyProfile.js";


const app = express()

app.use(express.json());
app.use(bodyParser.json());
// app.use(morgan('combined'));

dotenv.config()
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};


passportSetup(passport)
app.use(
  session({
    secret: 'yourSecretKey21',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);



app.use(cors(corsOptions));
connect()
//routes  
app.use(cookieParser())
app.use('/api/auth', authRoute)
app.use('/api/employee', employeeRoute)
app.use('/api/employer', employerRoute)
app.use('/api/jobSeeker', JobSeekerRoute)
app.use('/api/matrimony/profile', MatrimonyProfileRoute)
app.use('/api/matrimony/conversation', ConversationRoutesOfMatrimony)
app.use('/api/matrimony/messages', MessageRouteOfMatrimony)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went Wrong"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})

const server = http.createServer(app);

const io = new SocketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});


app.set('socketio', io);

let users = [];


const addUser = async (profileId, socketId) => {
  const existingUser = users.find(user => user.profileId === profileId);
  

  if (!existingUser) {
    users.push({ profileId, socketId });
    console.log("User added:", profileId, socketId);


    try {
      await Profile.findByIdAndUpdate(profileId,
        {
          lastLogin: new Date(),
          isOnline: true
        });
      console.log(`Profile ${profileId} is set to online and lastLogin updated`);
    } catch (error) {
      console.error("Error updating profile isOnline status:", error);
    }

  } else {
    console.log("ProfileId already associated with a socket. No changes made.", users);
  }

  console.log("Current user list after addUser:", users);
};


const removeUser = async (socketId) => {
  const user = users.find(user => user.socketId === socketId);
  if (user) {
    try {
      await Profile.findByIdAndUpdate(user.profileId, {
        isOnline: false,
        lastSeen: new Date()
      });
      console.log(`Profile ${user.profileId} is set to offline and lastSeen updated`);
      users = users.filter(user => user.socketId !== socketId);
      console.log("User removed:", socketId);
    } catch (error) {
      console.error("Error updating profile isOnline status:", error);
    }

    console.log("Current user list after removeUser:", users);
  }
};

export const getUser = (profileId) => {
  return users.find(user => user.profileId === profileId);
};

io.on("connection", (socket) => {
  console.log("Someone is connected");

  socket.on("addUser", profileId => {
    addUser(profileId, socket.id); 
    io.emit("getUsers", users);
    console.log("userList", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log('Received sendMessage event:', { senderId, receiverId, text });
    console.log("Current user list in sendMessage:", users);
    const user = getUser(receiverId);
    console.log("Retrieved user for receiverId", receiverId, ":", user);
    if (user) {
      console.log(`Sending message from ${senderId} to ${receiverId}: ${text}`);
      io.to(user.socketId).emit("getMessages", {
        senderId,
        text,
        createdAt: Date.now(),
      });
    } else {
      console.log(`User with id ${receiverId} not found.`);
    }
  });

  socket.on("disconnect", () => {
    console.log("Someone is disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  io.emit("welcome", "hello this is a message from the socket server");
});


server.listen(8003, () => {
  console.log("Server is running on port 8003")
})
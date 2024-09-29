import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './model/bookmodel.js';
import router from './routes/bookroutes.js';
import chatRouter from './routes/chatRoutes.js';
import cors from 'cors';
import connectDb from './db.js';
import authrouter from './routes/auth.js';
import nodemailer from 'nodemailer';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:5173', 'http://localhost:3000'],
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true,
}));

const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
    
    socket.on("disconnect", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });

  // Other socket event handlers...
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables
    pass: process.env.EMAIL_PASS,
  },
});

// Contact form route
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: email,
    to: 'priyanshjain8491@gmail.com',
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email.');
    }
    res.status(200).send('Email sent successfully.');
  });
});

app.get('/', (req, res) => {
  return res.status(404).send("book exchange");
});

app.use('/books', router);
app.use('/api/auth', authrouter);
app.use('/api/chat', chatRouter);

connectDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("index.js error:", err);
});

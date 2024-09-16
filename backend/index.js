import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './model/bookmodel.js';
import router from './routes/bookroutes.js';
import cors from 'cors';
import connectDb from './db.js';
import authrouter from './routes/auth.js';
import nodemailer from 'nodemailer';


const app = express(); 

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));

// Allow requests from specific frontend domains
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:5173'], // Add all allowed origins here
}));

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail', // my details add laTER
  auth: {
    user: ' ', // my email
    pass: '', 
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

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("index.js error:", err);
});

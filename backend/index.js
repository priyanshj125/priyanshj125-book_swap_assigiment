import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './model/bookmodel.js';
import router from './routes/bookroutes.js';
import cors from 'cors';
import connectDb from './db.js';
import authrouter from './routes/auth.js';

const app = express(); 
const port = 5000;

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));
app.use(cors({
  origin: 'http://localhost:5000', // or the origin of your frontend
}));
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend's port
}));



app.get('/', (req, res) => {
    // console.log(res);
    return res.status(404).send("book exchange");
});


app.use('/books', router);
app.use('/api/auth', authrouter);



connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("index.js.....................................erorr");
    console.log(err);
    
});

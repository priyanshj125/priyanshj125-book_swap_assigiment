import express, { response } from 'express';
import {PORT,mongoDBURL} from './config.js';
import {Book} from './model/bookmodel.js';
import bookRoutes from './routes/bookroutes.js';
import cors from 'cors';

import mongoose from 'mongoose';
const app = express();
app.use(express.json()); 
app.use(cors(
    { origin:'*',
     methods:["POST","GET","DELETE","PUT"],
     Credentials:true
   }
   ))
app.get('/', (req, res) => {
     console.log(res);
     return res.status(404).send( "book exchange") ;
});

app.use('/books',bookRoutes);
mongoose
   .connect(mongoDBURL)
   .then(() => {console.log("MongoDB Connected...");
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)
    });
   })
   .catch((err) => {console.log(err)});

    

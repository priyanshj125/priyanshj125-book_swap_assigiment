import express from 'express';
import { model } from 'mongoose';
import User from '../model/user.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fetchuser from '../model/middleware/fetchuser.js';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

const JWT_SECRET = 'priyansh123';


router.post('/createuser', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('pic')
], async (req, res) => {
    let success = false;

    console.log(body.name);
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ success, error: error.array() });
    }

    try {
        let users = await User.findOne({ email: req.body.email });
        if (users) {
            return res.status(400).json({ success, error: 'Email already exists' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            plan: 'free',
            pic: req.body.pic
        });
        console.log(user.pic);
        console.log("awuthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        const data = {
            id: user._id,
            name: user.name,
            email: user.email,
            plan: user.plan,
            pic: user.pic  
        };
        const authtoken = jwt.sign(data,JWT_SECRET,{ algorithm: 'HS384' });
        const zzzz =jwt.verify(authtoken,JWT_SECRET);
        // console.log(zzzz);
        success = true;
        res.json({ success, token: authtoken });
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

router.post('/login', [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').exists().withMessage('Password cannot be blank')
], async (req, res) => {
    let success = false;

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ success, error: 'Email not found' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: 'Password does not match' });
        }

        const data = {
            user: {
                id: user._id,
                plan:user.plan, 
                //  _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                // token: generateToken(user._id),
            }
        };
        console.log(data);

        const authtoken = jwt.sign(data ,JWT_SECRET);
        success = true;
        console.log( {success, authtoken,data});
        res.json({ success, authtoken,data});
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/getuser', async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});
 //  /api/auth/alluser?search=priyansh

 router.get('/alluser', fetchuser, async (req, res) => {
    try {
      // Construct the search keyword
   
        const keyword = req.query.search
          ? {
              $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
              ],
            }
          : {};
      
        const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
        res.send(users);
      ;
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server Error" });
    }
  });

export default router;

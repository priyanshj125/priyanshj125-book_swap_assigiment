import express from 'express';
import User from '../model/user.js';
import asyncHandler from 'express-async-handler'; 
import fetchuser from '../model/middleware/fetchuser.js';
import Chat from '../model/chatmodel.js';

const router = express.Router();

const JWT_SECRET = 'priyansh123';
router.post('',fetchuser,asyncHandler(async(req, res) => {
    
        const {userId}=req.body
        if(!userId){
            console.log("userid not send the request");
            return res.sendStatus(400 )
        }
        var isChat = await Chat.find({
          isGroupChat: false,
          $and: [
            { users: { $in: [req.user._id] } },
            { users: { $in: [userId] } }
          ]
        })
        .populate("users", "-password")
        .populate("latestMessage");
        console.log("acesss api call success");
    
      isChat = await User.populate(isChat, { 
        path: "latestMessage.sender",
        select: "name pic email",
      });
      if (isChat.length > 0) {
        res.send(isChat[0]);
      } else {
        var chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [req.user._id, userId],
        };


    try {    
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);

        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
        
    }

}})
);

//fetchallchat
router.get('/fetchchat',fetchuser,asyncHandler(async(req, res) => {
    try { Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      results = await User.populate(results, {
        path: "latestMessage.sender",
        select: "name pic email",
      });
      res.status(200).send(results);
    });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
        
    }
}));






router.post('/creategroupchat',fetchuser,asyncHandler(async(req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }
  console.log("aaaaaaaaaaaaaaaa");
  console.log(req.body.users);
  console.log(req.body.name);
  
  console.log("aaaaaaaaaaaaaaaa");

  let users = JSON.parse(req.body.users);
  console.log(users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
    }
    const creatorId = req.user.id.toString(); // Convert ObjectId to string
    users.push(creatorId);
    console.log("user:"+req.user);
    console.log("User:"+req.User);
    try {
      const groupChat = await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user.id,
      });
      // console.log(Chat.findOne({ _id: groupChat._id }) +"aaaaaaaaaaaaaaaaaaaaaa");
      console.log("Created Group Chat ID:", groupChat._id);
      
      console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");



    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}));


router.put('/removegroupchat',fetchuser,asyncHandler(async(req, res) => {
    try {
        const { chatId, chatName } = req.body;
      
        const updatedChat = await Chat.findByIdAndUpdate(
          chatId,
          {
            chatName: chatName,
          },
          {
            new: true,
          }
        )
          .populate("users", "-password")
          .populate("groupAdmin", "-password");
      
        if (!updatedChat) {
          res.status(404);
          throw new Error("Chat Not Found");
        } else {
          res.json(updatedChat);
        }
      }
      
        
     catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
        
    }}
  ))






router.put('/renamegroupchat',fetchuser,asyncHandler(async(req, res) => {
    try {
      const { chatId, chatName } = req.body;

      const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
          chatName: chatName,
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    
      if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
      } else {
        res.json(updatedChat);
      }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
        
    }

}));


router.put('/addusertogroup',fetchuser,asyncHandler(async(req, res) => {
  try {
      const { chatId, userId } = req.body;
    
      // check if the requester is admin
    
      const added = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: { users: userId },
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    
      if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
      } else {
        res.json(added);
      }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
}))










export default router;

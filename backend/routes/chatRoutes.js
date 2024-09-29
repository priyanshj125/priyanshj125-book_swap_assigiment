import express from 'express';
import User from '../model/user.js';
import asyncHandler from 'express-async-handler'; 
import fetchuser from '../model/middleware/fetchuser.js';
import Chat from '../model/chatmodel.js';
import Message from "../model/messagemodel.js";


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


// message api are here 
router.get('/allMessages/:chatId', fetchuser, asyncHandler(async (req, res) => {
  try {
    // Use req.params.chatId directly to find the messages related to the given chat
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
      
    // Send the retrieved messages in the response
    res.json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ message: error.message });
  }
}));



router.post('/sendmessage', fetchuser, asyncHandler(async (req, res) => {
  try {
    console.log("ccccccccccccccccccccc");  // Initial log to indicate the route is hit
    const { content, chatId } = req.body;
    console.log("aaaaaaaaaaaaaaa");  // Log to indicate the logic is proceeding further

    // Check if the required fields are present
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }

    // Create a new message object
    var newMessage = {
      sender: req.user.id,  // Assuming `req.user` is populated by `fetchuser`
      content: content,
      chat: chatId,
    };

    try {
      // Save the new message to the database
      var message = await Message.create(newMessage);

      // Populate relevant fields for the response
      message = await message.populate("sender", "name pic")
      message = await message.populate("chat")
      message = await User.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });

      // Update the chat's latest message
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

      res.json(message);  // Return the saved message
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
}));

export default router;

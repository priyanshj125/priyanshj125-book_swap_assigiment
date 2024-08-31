import express from 'express';
import { Book } from '../model/bookmodel.js';
import fetchuser from '../model/middleware/fetchuser.js';
import { body, validationResult } from 'express-validator';
import { model } from 'mongoose';
import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

const JWT_SECRET = 'priyansh123';

  //user books



//fetch all books
router.get('/', async(req, res) => {
    try {
        const books = await Book.find({});
        return  res.status(200).json({count : books.length,data:books}) ;
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
        
    }

});

router.get('/fetch', fetchuser, async (req, res) => {
  try {
    const { publishyear } = req.query;
    let books;
    if(publishyear){
       books = await Book.find({ user: req.user.id});
    }else{
     books = await Book.find({ user: req.user.id  });
  }
    res.json(books);
  } catch (error) {
    res.status(400).send({ error: "servies problem part 3 dume 401" })
    console.log(error)
  }
});
// router.post('/addnotes',fetchuser, [
//   body('title').not().isEmpty().withMessage('Title is required'),
//   body('author').not().isEmpty().withMessage('author is required').isLength({ min: 2 }),

// ], async (req, res) => {

//   try {
//     console.log("ppppppppppppppppppp");
//     console.log(req.body);
//     console.log("ppppppppppppppppppppp");
//     const { title, author, publishyear } = req.body;
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//       return res.status(410).json({ error: error.array() });
//     }
//     const iduser={ user:req.user.id}
//     const books = new Book({ title, author,  publishyear, iduser });
//     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
//     console.log(books);
//     const notessave = await books.save()
//     res.json(books);
//   } catch (error) {
//     res.status(420).send({ error: "servies problem dume part 2 401" })
//     console.log(error.message);
//     console.log(error)
//   }
// });
router.post('/addnotes', fetchuser, [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('author').not().isEmpty().withMessage('Author is required').isLength({ min: 2 }),
  body('publishyear').not().isEmpty().withMessage('Publish year is required')
], async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("User:", req.user);

    const { title, author, publishyear } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Directly use req.user.id for the user field
    const book = new Book({
      title,
      author,
      publishyear,
      user: req.user.id
    });

    console.log("Book to be saved:", book);

    const savedBook = await book.save();
    res.json(savedBook);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try {
    const { title, author, publishyear } = req.body;
    // Create a newBook object
    const newBook = {};
    if (title) { newBook.title = title };
    if (author) { newBook.author = author };
    if (publishyear) { newBook.publishyear = publishyear };

    // Find the note to be updated and update it
    let book = await Book.findById(req.params.id);
    // console.log(req.params.id); 
    // console.log(note.user);
    if (!book) { return res.status(404).send("Not Found") }
    console.log(book);
 
    if (book.user.toString() !== req.user.id) {
      // console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
      return res.status(401).send("Not Allowed");
    }
    book = await Book.findByIdAndUpdate(req.params.id, { $set: newBook }, { new: false })
    res.json({ book });
  } catch (error) {
    console.error(error.message);
  }
}
)
router.put ('/:id', async (req, res) => {
  try {
     if(
     !req.body.title ||
     !req.body.publishyear ||
     !req.body.author
     ){
        return res.status(400).send({
          message:"send all req detail" 
        })
     }
    const {id} = req.params;
    const result=await Book.findByIdAndUpdate(id,req.body)
    if (!result) {
      return res.status(404).send({message:"book not found"})
      
    }
    return res.status(200).send({message:'updates updated successfully'})

  } catch (error) {
     console.log(error.message); 
     res.status(500).send({message:error.message});       
  }
})
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let book = await Book.findById(req.params.id);
    if (!book) { return res.status(404).send("Not Found") }

    // Allow deletion only if user owns this Note
    if (book.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    book = await Book.findByIdAndDelete(req.params.id)
    res.json({ "Success": "BOOK has been deleted", book: book });
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
}
)
router.delete('/:id', async (req, res) => {
  try {
      const {id} = req.params;
      const result = await Book.findByIdAndDelete(id);
      if (!result) {
          return res.status(404).send({message: "Book not found"});
      }
      return  res.status(200).send({message:'Book deleted successfully'});
  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message});
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
              id: user._id
          }
      };

      console.log(data);
      const authtoken = jwt.sign(data ,JWT_SECRET);
      // console.log('Decoded Token:', decoded);
      success = true;
      res.json({ success, authtoken });
  } catch (e) {
      console.error(e.message);
      res.status(500).send('Internal Server Error');
  }
});



export default router;
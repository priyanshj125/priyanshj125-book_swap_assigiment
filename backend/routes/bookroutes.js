import express from 'express';
import { Book } from '../model/bookmodel.js';
const router= express.Router(); 
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
// fetch all books by id
router.get('/:id', async(req, res) => {
    try {
        const {id}=req.params;
        const book = await Book.findById(id);
        return  res.status(200).json(book) ;
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
        
    }

});
// update book
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
// delete book
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
router.post('/', async (req, res) => {
     try {
        if(
        !req.body.title ||
        !req.body.publishyear ||
        !req.body.author
        ){
            console.log(req.body.title);
            console.log(req.body.publishyear);
            console.log(req.body.auther);

            return res.status(400).send({message: "All fields are required!"});

        }
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            publishyear: req.body.publishyear,
        });
        const book = await Book.create(newBook);
        return res.status(201).send(book);
     } catch (error) {
        console.log(error.message); 
        res.status(500).send({message:error.message});       
     }
 })
export default router;
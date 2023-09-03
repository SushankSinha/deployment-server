import express from 'express'
import Book from '../Models/bookSchema.js';

const router = express.Router();

// Route to get all Tasks

router.get('/books', async (req, res) => {

  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Books' });
  }
});

// Route to get one Task

router.get('/books/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findOne({_id:id});
    res.send(book);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Books' });
  }
});

// Route to add a new Task

router.post('/books', async (req, res) => {

  const {title, content, user, status, completion} = req.body;

  if(!title || !content || !user){
      res.status(422).json({error : "Fill the required fields"})
  }else{

  try {
              
          const bookDetails = new Book({title, content, user, status, completion});

          await bookDetails.save();            
          
          res.status(201).json({message : "Book Saved!", bookDetails})
      
          } catch(err){
      console.log(err)
  }
}
});

router.put('/books/:id', async (req, res) => {

  const id = req.params.id;

  const {title, content, user, status, completion} = req.body;

    try {
      const updatedBooks = await Book.findByIdAndUpdate({_id:id}, { title, content, user, status, completion}, { new: true });
      res.status(201).json({message : "Book details Updated!", book: updatedBooks});
      if (!updatedBooks) {
        return res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating Book', error });
    }
});

router.delete('/books/:id', async (req, res) => {
  const id  = req.params.id;

  try {
    await Book.findByIdAndDelete({_id:id})
    res.status(204).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Book', error });
  }
});


export default router;
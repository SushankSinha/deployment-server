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
    const book = await Book.findOne({id:id});
    res.send(book);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving Books' });
  }
});

// Route to add a new Task

router.post('/books/add', async (req, res) => {

  const {name, poster, rating, summary} = req.body;


  try {
              
          const bookDetails = new Book({name, poster, rating, summary});

          await bookDetails.save();            
          
          res.status(201).json({message : "Book Saved!", bookDetails})
      
          } catch(err){
      console.log(err)
  }
});

router.put('/books/edit/:id', async (req, res) => {

  const id = req.params.id;

  const {name, poster, rating, summary} = req.body;

    try {
      const updatedBooks = await Book.updateOne({id:id}, { name, poster, rating, summary}, { new: true });
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
    await Book.findByIdAndDelete({id:id})
    res.status(204).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Book', error });
  }
});


export default router;
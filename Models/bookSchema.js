import mongoose from 'mongoose'

const bookData = new mongoose.Schema({
    bookName : {
        type : String
    },
    poster : {
        type : String
    },
    rating : {
        type : Number
    },
    summary : {
        type : String
    }
    
})

const Book = mongoose.model('BOOK', bookData);

export default Book;
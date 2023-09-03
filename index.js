import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cors from "cors";
import books from './router/booksRoute.js'

dotenv.config({path : './.env'});
const app = express();
const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {useUnifiedTopology : true,
  useNewUrlParser : true}).then(() => {
  console.log ("Mongoose connection started")
}).catch((err)=> console.log("Mongoose connection refused", err))

//get all books
// app.get("/books", async (req, res) => {
//   const books = await client
//     .db("b47-book-app")
//     .collection("books")
//     .find()
//     .toArray();
//   res.send(books);
// });

// //delete book by ID
// app.delete("/books/:id", async (req, res) => {
//   const { id } = req.params;
//   const book = await client
//     .db("b47-book-app")
//     .collection("books")
//     .deleteOne({ id: id });
//   res.send(book);
// });

// app.post("/books", async (req, res) => {
//   const newBooks = req.body;
//   const output = await client
//     .db("b47-book-app")
//     .collection("books")
//     .insertMany(newBooks);
//   res.send(output);
// });

// app.put("/books/:id", async (req, res) => {
//   const { id } = req.params;
//   const updatedBooks = req.body;
//   const output = await client
//     .db("b47-book-app")
//     .collection("books")
//     .updateOne({ id: id }, { $set: updatedBooks });
//   res.send(output);
// });

app.listen(PORT, () => console.log("Server starting on port", PORT));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use(books)

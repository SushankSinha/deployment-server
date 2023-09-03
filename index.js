import dotenv from "dotenv";
import express from "express";
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

app.use(express.urlencoded({extended: true}));

app.use(books)

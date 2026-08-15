import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
const port = 3000;

dotenv.config();

app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB is connected!")
    )

app.get('/', (req, res) => {
    res.json("Hello from express");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
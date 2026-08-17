import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from "./models/Task.js"

const app = express();
const port = 3000;

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB is connected!")
    );

app.get('/', (req, res) => {
    res.json("Hello from express");
});

app.put("/api/tasks/:_id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
    );

    res.json(task);
});

app.get("/api/tasks", async (req, res) => {
    const tasks = await Task.find();

    res.json(tasks);
});

app.post("/api/tasks", async (req, res) => {
    const task = new Task(req.body);

    const savedTask = await task.save();

    res.json(savedTask);
});

app.delete("/api/tasks/:_id", async (req, res) => {
    await Task.findByIdAndDelete(req.params._id);

    res.json({ message: "Task deleted" });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
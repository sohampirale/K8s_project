import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";
configDotenv();

const app = express();
app.use(cors());
app.use(express.json());

await mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected to the database");
}).catch((err)=>{
    console.log(err);
});

const Schema = new mongoose.Schema({
    user1: String,
    user2: String,
    whoWon: String,
    time: { type: Date, default: Date.now },
});

const Records = mongoose.model("records", Schema);

// app.get("/", (req, res) => {
//     res.send("<h1>Hello V</h1>");
// });

app.post("/nemo", async (req, res) => {
    try {
        const data = req.body;
        const newScore = new Records(data);
        await newScore.save();
        res.status(200).json({ message: "Score saved successfully!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "The database said go away" });
    }
});

const PORT = 4904;
app.listen(PORT, "0.0.0.0", () => {
    console.log("Server is running on some port why should I tell you?");
});

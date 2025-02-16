import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        setTimeout(connectDB, 5000);
    }
};
await connectDB();

const recordSchema = new mongoose.Schema({
    user1: String,
    user2: String,
    whoWon: String,
    time: { type: Date, default: Date.now },
});

const Record = mongoose.model("Record", recordSchema);

app.post("/nemo", async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({ error: "Database not connected" });
        }

        const data = req.body;
        const newScore = new Record(data);
        await newScore.save();

        res.status(200).json({ message: "Score saved successfully!" });
    } catch (err) {
        console.error("Error saving score:", err);
        res.status(500).json({ error: "Failed to save score", err});
    }
});

const PORT = 4904;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});

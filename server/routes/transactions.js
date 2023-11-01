import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.get("/transaction", async (req, res) => {
    try {
        const kpis = await Transaction.find()
        .limit(50)
        .sort({ createdOn: -1 })
        res.status(200).json(kpis)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

export default router;
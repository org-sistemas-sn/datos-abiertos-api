import { Router } from "express";
import { messages } from "../constants/index.js"

const router = new Router();

router.get("/status", (req, res) => {
  res.status(200).json({ status: messages.SERVER_STATUS });
});

// Mejorar para direcciones no definidas (que no partan de /api)
router.all("*", (req, res) => res.send("Not found"));

export default router;

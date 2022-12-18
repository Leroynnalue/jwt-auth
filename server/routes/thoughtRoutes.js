import express from "express"

import {
    getThoughts,
    getThought,
    setThought,
    updateThought,
    deleteThought
} from "../controller/thoughtController.js"
import { protect } from "../middleware/auth/authMiddleware.js"

const router = express.Router();

router.get("/", protect, getThoughts);
router.get("/:id", protect, getThought);
router.post("/", protect, setThought);
router.post("/:id", protect, updateThought);
router.delete("/:id", protect, deleteThought);

export default router;
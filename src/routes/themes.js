import { Router } from "express";
import {
    getAllThemes,
    getThemeById,
    createTheme,
    updateTheme,
    deleteTheme
} from "../controllers/themeController.js";

const router = Router();

router.get("/", getAllThemes);
router.get("/:id", getThemeById);
router.post("/", createTheme);
router.put("/:id", updateTheme);
router.delete("/:id", deleteTheme);

export default router;

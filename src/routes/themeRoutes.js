import { Router } from "express";
import {
    getAllThemes,
    getThemeById,
    createTheme,
    updateTheme,
    deleteTheme
} from "../controllers/themeController.js";
import { getItemsByThemeId } from "../controllers/itemController.js";

const router = Router();

router.get("/", getAllThemes);
router.get("/:themeId/items", getItemsByThemeId);
router.get("/:id", getThemeById);
router.post("/", createTheme);

export default router;

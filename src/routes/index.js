import { Router } from "express";
import {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    getItemsByThemeId,
    deleteItem,
    getItemFile
} from "../controllers/itemController.js";
import {
    getAllSections,
    getSectionById,
    createSection,
    updateSection,
    deleteSection
} from "../controllers/sectionController.js";
import {
    getAllThemes,
    getThemeById,
    createTheme,
    updateTheme,
    getThemesBySectionId,
    deleteTheme
} from "../controllers/themeController.js";

const router = Router();

router.get("/status", (req, res) => {
    res.status(200).json({ status: "OK", message: "API is running" });
})

router.get("/items", getAllItems);
router.get("/items/:id", getItemById);
router.get("/items/:id/file", getItemFile);
router.get("/themes/:themeId/items", getItemsByThemeId);
router.post("/items", createItem);
router.put("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);

router.get("/sections", getAllSections);
router.get("/sections/:id", getSectionById);
router.get("/sections/:id/themes", getThemesBySectionId);
router.post("/sections", createSection);
router.put("/sections/:id", updateSection);
router.delete("/sections/:id", deleteSection);

router.get("/themes", getAllThemes);
router.get("/themes/:id", getThemeById);
router.post("/themes", createTheme);
router.put("/themes/:id", updateTheme);
router.delete("/themes/:id", deleteTheme);

export default router;

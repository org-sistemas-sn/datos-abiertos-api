import { Router } from "express";
import {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    getItemsByThemeId,
    deleteItem,
    getItemFile,
    getItemsByName,
    getItemSectionAndTheme
} from "../controllers/itemController.js";

const router = Router();

router.get("/search", getItemsByName);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.get("/:id/file", getItemFile);
router.get("/:id/section-theme", getItemSectionAndTheme);
router.get("/themes/:themeId/items", getItemsByThemeId);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;

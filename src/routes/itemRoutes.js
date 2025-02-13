import { Router } from "express";
import {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getItemFile,
    getItemData,
    getItemsByName,
    getItemSectionAndTheme
} from "../controllers/itemController.js";

const router = Router();


router.get("/search", getItemsByName);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.get("/:id/file", getItemFile);
router.get("/:id/data", getItemData);
router.get("/:id/section-theme", getItemSectionAndTheme);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;

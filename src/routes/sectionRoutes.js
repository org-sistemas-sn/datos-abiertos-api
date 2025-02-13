import { Router } from "express";
import {
    getAllSections,
    getSectionById,
    createSection,
    updateSection,
    deleteSection,
} from "../controllers/sectionController.js";

import {
    getThemesBySectionId
} from "../controllers/themeController.js";

const router = Router();

router.get("/", getAllSections);
router.get("/:id", getSectionById);
router.get("/:id/themes", getThemesBySectionId);
router.post("/", createSection);
router.put("/:id", updateSection);
router.delete("/:id", deleteSection);



export default router;

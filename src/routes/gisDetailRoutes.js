import { Router } from "express";
import { 
    createGisDetail,
    getGisDetailsByItem
} from "../controllers/gisDetailController.js";

const router = Router();

router.post("/", createGisDetail);
router.get("/:id_item", getGisDetailsByItem);

export default router;

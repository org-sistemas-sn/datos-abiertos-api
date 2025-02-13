import { Router } from "express";
import { 
    getAllEventDates, 
    getEventDateById, 
    createEventDate, 
    updateEventDate, 
    deleteEventDate, 
    getEventDatesByMonthYear 
} from "../controllers/eventDateController.js";

const router = Router();

router.get("/", getAllEventDates);
router.get("/:id", getEventDateById);
router.get("/month-year/:year/:month", getEventDatesByMonthYear);
router.post("/", createEventDate);
router.put("/:id", updateEventDate);
router.delete("/:id", deleteEventDate);

export default router;

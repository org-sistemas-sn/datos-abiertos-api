import { Router } from "express";
import itemsRoutes from "./items.js";
import sectionsRoutes from "./sections.js";
import themesRoutes from "./themes.js";
import eventDatesRoutes from "./eventDates.js";

const router = Router();

// Endpoint de prueba
router.get("/status", (req, res) => {
    res.status(200).json({ status: "OK", message: "API is running" });
});

// Usar las rutas con prefijos
router.use("/event", eventDatesRoutes);
router.use("/items", itemsRoutes);
router.use("/sections", sectionsRoutes);
router.use("/themes", themesRoutes);

export default router;

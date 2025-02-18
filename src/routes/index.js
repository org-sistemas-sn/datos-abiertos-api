import { Router } from "express";
import itemRoutes from "./itemRoutes.js";
import sectionRoutes from "./sectionRoutes.js";
import eventDateRoutes from "./eventDateRoutes.js";
import themeRoutes from "./themeRoutes.js";
import gisDetail from "./gisDetailRoutes.js"

const router = Router();

router.get("/status", (req, res) => {
    res.status(200).json({ status: "OK", message: "API is running" });
});

// Importar rutas
router.use("/items", itemRoutes);
router.use("/sections", sectionRoutes);
router.use("/event", eventDateRoutes);
router.use("/themes", themeRoutes);
router.use("/gis-details", gisDetail)

export default router;

import GisDetail from "../models/gisDetails/index.js";

export const createGisDetail = async (req, res) => {
    try {
        const newGisDetail = await GisDetail.create(req.body);
        res.status(201).json(newGisDetail);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getGisDetailsByItem = async (req, res) => {
    try {
        const { id_item } = req.params; // Se obtiene el id_item desde los parámetros de la URL
        
        // Busca todos los GisDetails que coincidan con el id_item
        const gisDetails = await GisDetail.findAll({
            where: { id_item }
        });
        
        if (!gisDetails || gisDetails.length === 0) {
            return res.status(404).json({ message: "No se encontraron detalles GIS para el item especificado." });
        }
        
        res.status(200).json(gisDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

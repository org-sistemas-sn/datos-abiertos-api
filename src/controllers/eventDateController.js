import EventDate from "../models/eventsDates/index.js";

// Obtener todas las fechas de eventos
export const getAllEventDates = async (req, res) => {
    try {
        const eventDates = await EventDate.findAll({
            where: { enabled: true }, // Solo eventos activos
            order: [["date", "ASC"]], // Ordenados por fecha
        });
        res.status(200).json(eventDates);
    } catch (error) {
        console.error("Error al obtener las fechas de eventos:", error);
        res.status(500).json({ error: "Error al obtener las fechas de eventos" });
    }
};

// Obtener una fecha de evento por ID
export const getEventDateById = async (req, res) => {
    try {
        const { id } = req.params;
        const eventDate = await EventDate.findByPk(id);
        if (!eventDate) {
            return res.status(404).json({ error: "Fecha de evento no encontrada" });
        }
        res.status(200).json(eventDate);
    } catch (error) {
        console.error("Error al obtener la fecha de evento:", error);
        res.status(500).json({ error: "Error al obtener la fecha de evento" });
    }
};

// Crear una nueva fecha de evento
export const createEventDate = async (req, res) => {
    try {
        const { date, title, description } = req.body;
        if (!date || !title) {
            return res.status(400).json({ error: "La fecha y el título son obligatorios" });
        }

        const newEventDate = await EventDate.create({ date, title, description });
        res.status(201).json(newEventDate);
    } catch (error) {
        console.error("Error al crear la fecha de evento:", error);
        res.status(500).json({ error: "Error al crear la fecha de evento" });
    }
};

// Actualizar una fecha de evento por ID
export const updateEventDate = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, title, description, enabled } = req.body;

        const eventDate = await EventDate.findByPk(id);
        if (!eventDate) {
            return res.status(404).json({ error: "Fecha de evento no encontrada" });
        }

        await eventDate.update({ date, title, description, enabled });
        res.status(200).json(eventDate);
    } catch (error) {
        console.error("Error al actualizar la fecha de evento:", error);
        res.status(500).json({ error: "Error al actualizar la fecha de evento" });
    }
};

// Eliminar (soft delete) una fecha de evento por ID
export const deleteEventDate = async (req, res) => {
    try {
        const { id } = req.params;
        const eventDate = await EventDate.findByPk(id);
        if (!eventDate) {
            return res.status(404).json({ error: "Fecha de evento no encontrada" });
        }

        await eventDate.destroy(); // Soft delete si paranoid: true
        res.status(200).json({ message: "Fecha de evento eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la fecha de evento:", error);
        res.status(500).json({ error: "Error al eliminar la fecha de evento" });
    }
};

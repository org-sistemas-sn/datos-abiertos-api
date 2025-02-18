import { Op } from "sequelize";
import EventDate from "../models/eventsDates/index.js";

// Obtener todas las fechas de eventos
export const getAllEventDates = async (req, res) => {
    try {
        const eventDates = await EventDate.findAll({
            where: { enabled: true }, // Solo eventos activos
            order: [["date", "ASC"]], // Ordenados por fecha
            attributes: ["id", "date", "title", "description", "img_path", "enabled"] // Asegurar que el ID se incluya
        });
        res.status(200).json(eventDates);
    } catch (error) {
        console.error("Error al obtener las fechas de eventos:", error);
        res.status(500).json({ error: "Error al obtener las fechas de eventos" });
    }
};

// Obtener eventos por mes y año
export const getEventDatesByMonthYear = async (req, res) => {
    try {
        const { year, month } = req.params;

        // Validar entrada
        if (!year || !month) {
            return res.status(400).json({ error: "El año y el mes son obligatorios" });
        }

        // Convertir a enteros
        const yearInt = parseInt(year, 10);
        const monthInt = parseInt(month, 10);

        if (isNaN(yearInt) || isNaN(monthInt) || monthInt < 1 || monthInt > 12) {
            return res.status(400).json({ error: "Mes o año inválido" });
        }

        // Crear el rango de fechas: Primer día del mes actual hasta el primer día del siguiente mes
        const startDate = `${yearInt}-${String(monthInt).padStart(2, "0")}-01`;
        const endMonth = monthInt === 12 ? 1 : monthInt + 1;
        const endYear = monthInt === 12 ? yearInt + 1 : yearInt;
        const endDate = `${endYear}-${String(endMonth).padStart(2, "0")}-01`;

        // Buscar eventos dentro del rango
        const eventDates = await EventDate.findAll({
            where: {
                date: {
                    [Op.gte]: startDate,  // Mayor o igual que el primer día del mes
                    [Op.lt]: endDate      // Menor que el primer día del siguiente mes
                },
                enabled: true // Solo traer eventos activos
            },
            order: [["date", "ASC"]],
            attributes: ["id", "date", "title", "description", "img_path", "enabled"]
        });

        res.status(200).json(eventDates);
    } catch (error) {
        console.error("Error al obtener fechas de eventos por mes y año:", error);
        res.status(500).json({ error: "Error al obtener fechas de eventos" });
    }
};

// Obtener una fecha de evento por ID
export const getEventDateById = async (req, res) => {
    try {
        const { id } = req.params;
        const eventDate = await EventDate.findByPk(id, {
            attributes: ["id", "date", "title", "description", "img_path" , "enabled"]
        });
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
        const { date, title, description, img_path } = req.body;
        if (!date || !title) {
            return res.status(400).json({ error: "La fecha y el título son obligatorios" });
        }

        const newEventDate = await EventDate.create({ date, title, description, img_path });
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

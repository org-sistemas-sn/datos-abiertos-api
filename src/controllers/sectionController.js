import Section from "../models/sections/index.js";

export const getAllSections = async (req, res) => {
    try {
        const sections = await Section.findAll();
        res.json(sections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSectionById = async (req, res) => {
    try {
        const section = await Section.findByPk(req.params.id);
        if (!section) return res.status(404).json({ error: "Section not found" });
        res.json(section);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createSection = async (req, res) => {
    try {
        const newSection = await Section.create(req.body);
        res.status(201).json(newSection);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateSection = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Section.update(req.body, { where: { id } });
        if (!updated) return res.status(404).json({ error: "Section not found" });
        res.json({ message: "Section updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteSection = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Section.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ error: "Section not found" });
        res.json({ message: "Section deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
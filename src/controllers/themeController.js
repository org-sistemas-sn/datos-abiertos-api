import Theme from "../models/themes/index.js";

export const getAllThemes = async (req, res) => {
    try {
        const themes = await Theme.findAll();
        res.json(themes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getThemeById = async (req, res) => {
    try {
        const theme = await Theme.findByPk(req.params.id);
        if (!theme) return res.status(404).json({ error: "Theme not found" });
        res.json(theme);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createTheme = async (req, res) => {
    try {
        const newTheme = await Theme.create(req.body);
        res.status(201).json(newTheme);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateTheme = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Theme.update(req.body, { where: { id } });
        if (!updated) return res.status(404).json({ error: "Theme not found" });
        res.json({ message: "Theme updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteTheme = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Theme.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ error: "Theme not found" });
        res.json({ message: "Theme deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

import Item from "../models/items/index.js";

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getItemById = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: "Item not found" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createItem = async (req, res) => {
    try {
        const newItem = await Item.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Item.update(req.body, { where: { id } });
        if (!updated) return res.status(404).json({ error: "Item not found" });
        res.json({ message: "Item updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Item.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ error: "Item not found" });
        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

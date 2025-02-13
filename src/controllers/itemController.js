import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import https from "https";
import csvParser from "csv-parser";
import xlsx from "xlsx";
import Item from "../models/items/index.js";

import Theme from "../models/themes/index.js";
import Section from "../models/sections/index.js";
import { Op } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMP_DIRECTORY = path.join(__dirname, "../temp/");
const FTP_SERVER_PATH = "https://staticcontent.sannicolasciudad.gob.ar/images/datos-abiertos/";

const DATA_DIRECTORY = path.join(__dirname, "../data/");

export const getItemData = async (req, res) => {
    try {
        const { id } = req.params;
        
        const item = await Item.findByPk(id);
        
        if (!item) {
            console.log("❌ Item no encontrado");
            return res.status(404).json({ error: "Item not found" });
        }
        
        const fileName = item.url_or_ftp_path;
        const filePath = path.join(DATA_DIRECTORY, fileName);
        
        console.log(`📌 Buscando archivo en carpeta data: ${fileName}`);
        
        if (!fs.existsSync(filePath)) {
            console.log("❌ Archivo no encontrado en la carpeta data");
            return res.status(404).json({ error: "File not found in data directory" });
        }
        
        console.log(`✅ Archivo encontrado: ${filePath}`);
        
        if (item.type === "CSV") {
            const results = [];
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on("data", (data) => results.push(data))
                .on("end", () => {
                    res.json({ type: "CSV", data: results });
                });
        } else if (item.type === "XLSX") {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
            res.json({ type: "XLSX", data: sheetData });
        } else {
            console.log("⚠️ Tipo de archivo no soportado");
            return res.status(400).json({ error: "Unsupported file type" });
        }
    } catch (error) {
        console.error("❌ Error al recuperar el archivo:", error);
        res.status(500).json({ error: "Error retrieving the file" });
    }
};



export const getItemFile = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`📌 Buscando item con ID: ${id}`);

        const item = await Item.findByPk(id);
        if (!item) {
            console.log("❌ Item no encontrado");
            return res.status(404).json({ error: "Item not found" });
        }

        const fileType = item.type?.toUpperCase();
        const fileName = item.url_or_ftp_path;
        let fileUrl;

        if (fileType === "XLSX") {
            fileUrl = `${FTP_SERVER_PATH}xlsx/${fileName}`;
        } else if (fileType === "CSV") {
            fileUrl = `${FTP_SERVER_PATH}csv/${fileName}`;
        } else {
            console.log("❌ Tipo de archivo inválido:", fileType);
            return res.status(400).json({ error: "Invalid file type" });
        }

        const tempFilePath = path.join(TEMP_DIRECTORY, fileName);
        console.log(`📌 Temp file path: ${tempFilePath}`);
        console.log(`📌 Descargando archivo desde: ${fileUrl}`);

        if (!fs.existsSync(TEMP_DIRECTORY)) {
            console.log("📂 Creando directorio TEMP...");
            fs.mkdirSync(TEMP_DIRECTORY, { recursive: true });
        }

        // 📌 **Descargar el archivo desde el FTP con un Stream controlado**
        const fileStream = fs.createWriteStream(tempFilePath);

        https.get(fileUrl, (response) => {
            console.log(`📌 Respuesta del servidor: ${response.statusCode}`);
            if (response.statusCode !== 200) {
                console.log(`❌ Archivo no encontrado en el FTP (${response.statusCode}): ${fileUrl}`);
                return res.status(404).json({ error: "File not found on FTP" });
            }

            // 📌 Controlar la descarga en tiempo real
            let downloadedBytes = 0;
            response.on("data", (chunk) => {
                downloadedBytes += chunk.length;
                process.stdout.write(`⬇️ Descargando... ${Math.round(downloadedBytes / 1024)} KB\r`);
            });

            response.pipe(fileStream);

            fileStream.on("finish", async () => {
                console.log(`✅ Descarga completada: ${tempFilePath}`);
                fileStream.close();

                try {
                    if (fileType === "CSV") {
                        console.log("📌 Procesando archivo CSV...");
                        const results = [];

                        fs.createReadStream(tempFilePath)
                            .pipe(csvParser())
                            .on("data", (data) => results.push(data))
                            .on("end", async () => {
                                console.log(`✅ CSV leído correctamente: ${fileName}`);
                                await fs.promises.unlink(tempFilePath);
                                console.log("✅ Archivo eliminado correctamente");
                                res.json({ type: "CSV", data: results });
                            })
                            .on("error", async (err) => {
                                console.error("❌ Error leyendo CSV:", err);
                                await fs.promises.unlink(tempFilePath);
                                res.status(500).json({ error: "Error processing CSV file" });
                            });

                    } else if (fileType === "XLSX") {
                        console.log("📌 Procesando archivo XLSX...");
                        try {
                            await new Promise((resolve) => setTimeout(resolve, 500));
                            const workbook = xlsx.readFile(tempFilePath);
                            const sheetName = workbook.SheetNames[0];
                            const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

                            console.log(`✅ XLSX leído correctamente: ${fileName}`);
                            await fs.promises.unlink(tempFilePath);
                            console.log("✅ Archivo eliminado correctamente");
                            res.json({ type: "XLSX", data: sheetData });

                        } catch (err) {
                            console.error("❌ Error leyendo XLSX:", err);
                            await fs.promises.unlink(tempFilePath);
                            res.status(500).json({ error: "Error processing XLSX file" });
                        }
                    }
                } catch (error) {
                    console.error("❌ Error procesando archivo:", error);
                    res.status(500).json({ error: "Error processing the file" });
                }
            });

            fileStream.on("error", (err) => {
                console.error("❌ Error descargando archivo:", err);
                res.status(500).json({ error: "Error downloading file from FTP" });
            });

        }).on("error", (err) => {
            console.error("❌ Error obteniendo archivo desde el FTP:", err);
            res.status(500).json({ error: "Error retrieving file from FTP" });
        });

    } catch (error) {
        console.error("❌ Error general al procesar el archivo:", error);
        res.status(500).json({ error: "Error retrieving the file" });
    }
};


export const getItemSectionAndTheme = async (req, res) => {
    try {
        const { id } = req.params;

        // 📌 Buscar el item por su ID
        const item = await Item.findByPk(id);

        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        // 📌 Buscar el tema asociado al item
        const theme = await Theme.findByPk(item.id_theme);

        // 📌 Buscar todos los items que pertenecen a este theme (SIN include)
        let items = [];
        if (theme) {
            items = await Item.findAll({
                where: { id_theme: theme.id },
            });
        }

        // 📌 Buscar la sección asociada al tema (si el tema existe)
        let section = null;
        if (theme) {
            section = await Section.findByPk(theme.id_section);
        }

        // 📌 Construir la respuesta
        const response = {
            item,
            theme: theme ? {
                id: theme.id,
                name: theme.name,
                description: theme.description,
                id_section: theme.id_section,
                items: items // 📌 Ahora el theme contiene todos los items relacionados
            } : null,
            section: section || null
        };

        res.json(response);
    } catch (error) {
        console.error("Error al obtener sección y tema del item:", error);
        res.status(500).json({ error: "Error retrieving section and theme" });
    }
};



export const getItemsByName = async (req, res) => {
    try {
        const { name } = req.query;

        console.log("Nombre recibido:", name);

        if (!name) {
            return res.status(400).json({ error: "El parámetro 'name' es obligatorio" });
        }

        // Búsqueda insensible a mayúsculas/minúsculas para MySQL
        const items = await Item.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%` // LIKE es compatible con MySQL
                },
            },
        });

        if (!items.length) {
            return res.status(404).json({ error: "No se encontraron items con ese nombre" });
        }

        res.json(items);
    } catch (error) {
        console.error("Error al buscar los items por nombre:", error);
        res.status(500).json({ error: "Error al buscar los items" });
    }
};


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


export const getItemsByThemeId = async (req, res) => {
    try {
        const { themeId } = req.params;
        const items = await Item.findAll({ where: { id_theme: themeId } }); // Cambiado a id_theme

        if (!items.length) {
            return res.status(404).json({ error: "No items found for this theme" });
        }

        res.json(items);
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

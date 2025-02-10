import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";
import Theme from "../themes/index.js";

const Item = sequelize.define(
    "items",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            set(value) {
                this.setDataValue("name", value?.toUpperCase());
            },
        },
        description: {
            type: DataTypes.STRING,
        },
        url_or_ftp_path: {
            type: DataTypes.STRING,
        },
        id_theme: {
            type: DataTypes.INTEGER, 
            references: {
                model: Theme, 
                key: 'id', 
            },
            onUpdate: 'CASCADE', 
            onDelete: 'SET NULL',
        },
        type: {
            type: DataTypes.STRING,
            set(value) {
                this.setDataValue("type", value?.toUpperCase());
            },
        },
        publication_date: {
            type: DataTypes.STRING,
        },
        responsible: {
            type: DataTypes.STRING,
        },
        maintenance: {
            type: DataTypes.STRING,
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: true, 
        },
    },
    {
        timestamps: true,
        paranoid: true,
    }
);

export default Item;
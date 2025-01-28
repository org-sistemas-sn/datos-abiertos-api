import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";
import Section from "../sections/index.js";

const Theme = sequelize.define(
    "themes",
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
        id_section: {
            type: DataTypes.INTEGER, 
            references: {
                model: Section, 
                key: 'id', 
            },
            onUpdate: 'CASCADE', 
            onDelete: 'SET NULL',
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

export default Theme;
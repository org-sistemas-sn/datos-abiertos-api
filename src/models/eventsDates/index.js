import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";

const EventDate = sequelize.define(
    "event_dates",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATEONLY, 
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        img_path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        enabled: {
            type: DataTypes.SMALLINT,
            defaultValue: 1, 
        },
    },
    {
        timestamps: true,
        paranoid: true,
        schema: 'datos-abiertos'
    }
);

export default EventDate;

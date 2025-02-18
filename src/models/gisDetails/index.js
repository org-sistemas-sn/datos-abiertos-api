import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";
import Item from "../items/index.js";

const GisDetail = sequelize.define(
    "GisDetail",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_item: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Item,
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        opening_hours: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        smm: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        management: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "gis_details",
        timestamps: true,
        paranoid: true,
    }
);

export default GisDetail;

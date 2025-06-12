import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";

const Section = sequelize.define(
    "sections",
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
        icon_path: {
            type: DataTypes.STRING,
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

export default Section;

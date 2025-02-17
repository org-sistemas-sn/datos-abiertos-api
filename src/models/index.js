import Section from "./sections/index.js";
import Theme from "./themes/index.js";
import Item from "./items/index.js";
import GisDetail from "./gisDetails/index.js";

// Una sección puede tener muchos temas, pero un tema pertenece a una sola sección.
Section.hasMany(Theme, {
  foreignKey: "id_section",
  as: "themes",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

Theme.belongsTo(Section, {
  foreignKey: "id_section",
  as: "section", 
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

// Un tema puede tener muchos ítems, pero un ítem pertenece a un solo tema.
Theme.hasMany(Item, {
  foreignKey: "id_theme",
  as: "items",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

Item.belongsTo(Theme, {
  foreignKey: "id_theme",
  as: "theme", 
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

// Un ítem puede tener un solo detalle GIS, pero un detalle GIS pertenece a un solo ítem.
Item.hasOne(GisDetail, {
  foreignKey: "id_item",
  as: "gisDetail",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

GisDetail.belongsTo(Item, {
  foreignKey: "id_item",
  as: "item",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

export { Section, Theme, Item, GisDetail };

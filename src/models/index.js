import Section from "./sections/index.js";
import Theme from "./themes/index.js";
import Item from "./items/index.js";

// Una sección puede tener muchos temas, pero un tema pertenece a una sola sección.
Section.hasMany(Theme, {
  foreignKey: "id_section",
  as: "themes",
  onUpdate: "CASCADE",
  onDelete: "SET NULL",
});

Theme.belongsTo(Section, {
  foreignKey: "id_section",
  as: "section", 
  onUpdate: "CASCADE",
  onDelete: "SET NULL",
});

// Un tema puede tener muchos ítems, pero un ítem pertenece a un solo tema.
Theme.hasMany(Item, {
  foreignKey: "id_theme",
  as: "items", // Alias para acceder a los ítems desde un tema
  onUpdate: "CASCADE",
  onDelete: "SET NULL",
});

Item.belongsTo(Theme, {
  foreignKey: "id_theme",
  as: "theme", 
  onUpdate: "CASCADE",
  onDelete: "SET NULL",
});

export { Section, Theme, Item };

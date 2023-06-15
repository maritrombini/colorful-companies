import { Sequelize } from "sequelize";
import db from "../db.js";
import Ratings from "./ratingModel.js";

const Organizations = db.define("Organizations", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  cnpj: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  city: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  amountOfReviews: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  points: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  deletedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

Organizations.belongsToMany(Ratings, { through: "Organizations_Ratings" });
Ratings.belongsToMany(Organizations, { through: "Organizations_Ratings" });

export default Organizations;

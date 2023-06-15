import { Sequelize } from "sequelize";
import db from "../db.js";
import Ratings from "./ratingModel.js";

const People = db.define("People", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  cpf: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  amountOfContributions: {
    type: Sequelize.INTEGER,
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

People.belongsToMany(Ratings, { through: "People_Rating" });
Ratings.belongsToMany(People, { through: "People_Rating" });

export default People;

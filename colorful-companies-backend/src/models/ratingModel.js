import { Sequelize } from "sequelize";
import db from "../db.js";

const Ratings = db.define("Ratings", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  review: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  score: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  dateRate: {
    type: Sequelize.TEXT,
    allowNull: false,
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

export default Ratings;

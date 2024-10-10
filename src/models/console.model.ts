import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
import { Game } from "./game.model";
export interface ConsoleAttributes {
  id?: number;
  name: string;
  manufacturer: string;
}

export class Console extends Model<ConsoleAttributes> implements ConsoleAttributes {
  public id!: number;
  public name!: string;
  public manufacturer!: string;
}

Console.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "consoles",
  }
);

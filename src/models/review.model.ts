import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
import { GameDTO } from "../dto/game.dto";
import { Game } from "./game.model";

export interface ReviewAttributes {
  id?: number;
  rating: number;
  review_text?: string;
  game_id: number;
  game?: GameDTO;
}

export class Review
  extends Model<ReviewAttributes>
  implements ReviewAttributes
{
  public id!: number;
  public rating!: number;
  public review_text!: string;
  public game_id!: number;
  public game!: GameDTO;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review_text: {
      type: DataTypes.TEXT,
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "reviews",
  }
);

Review.belongsTo(Game, { foreignKey: "game_id", as: "game" })
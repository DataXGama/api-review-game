import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
import { GameDTO } from "../dto/game.dto";

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
  id!: number;
  rating!: number;
  review_text!: string;
  game_id!: number;
  game!: GameDTO;
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
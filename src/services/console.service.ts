import { HostNotFoundError, UUID, UUIDV4 } from "sequelize";
import { Console } from "../models/console.model";
import { notFound } from "../error/NotFoundError";
import { Game } from "../models/game.model";
import { Review } from "../models/review.model";
import { preConditionFailed } from "../error/PreConditionFailedError";

export class ConsoleService {

  // Récupère toutes les consoles
  public async getAllConsoles(): Promise<Console[]> {
    return await Console.findAll();
  }

  // Récupère une console par ID
  public async getConsoleById(id: number): Promise<Console> {
    const console = await Console.findByPk(id);

    if(!console){
      throw notFound("Console")
    }
    return console;
  }

  // Crée une nouvelle console
  public async createConsole(
    name: string,
    manufacturer: string
  ): Promise<Console> {
    return Console.create({ name: name, manufacturer: manufacturer });
  }

  // Supprime une console par ID
  public async deleteConsole(id: number): Promise<void> {
    const console = await Console.findByPk(id);

    if (!console) {
      throw notFound("console");
    }

    const games = await Game.findAll({
      where: {
        console_id: console.id,
      }
    });

    for(const game of games){
      const amountReview = await Review.count({
        where: {
          game_id: game.id
        }
      })

      if(amountReview > 0){
        throw preConditionFailed("review count > 0 ")
      }
    }

    for(const game of games){
      game.destroy();
    }

    console.destroy();
  }

  // Met à jour une console
  public async updateConsole(
    id: number,
    name?: string,
    manufacturer?: string
  ): Promise<Console | null> {
    const console = await Console.findByPk(id);

    if (console) {
      if (name) console.name = name;
      if (manufacturer) console.manufacturer = manufacturer;
      await console.save();
      return console;
    }
    
    throw notFound("Console")
  }
}

export const consoleService = new ConsoleService();

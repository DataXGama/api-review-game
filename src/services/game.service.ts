import { GameDTO } from "../dto/game.dto";
import { notFound } from "../error/NotFoundError";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";

export class GameService {
  public async getAllGames(): Promise<GameDTO[]> {
    return Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }

  public async getGame(gameId: number): Promise<GameDTO> {
    const gameDto = await Game.findByPk(gameId);

    if (!gameDto){
      throw notFound("Le jeu n'existe pas.") 
    }

    return gameDto;
  }

  public async createGame(gameDto: GameDTO): Promise<GameDTO> {
    const consoleId = gameDto.console?.id;
    const console = await Console.findByPk(consoleId);

    if(!console) {
      throw notFound("Console")
    }

    return Game.create({
      title: gameDto.title,
      console_id: console.id,
    })
  }

  public async updateGame(id: number, gameDto: GameDTO): Promise<GameDTO> {
    const game = await Game.findByPk(id);

    if(!game) {
      throw notFound("Game")
    }
    
    const newConsoleId = gameDto.console?.id;
    const console = await Console.findByPk(newConsoleId);

    if(!console) {
      throw notFound("Console");
    }

    if (gameDto.title) game.title = gameDto.title;
    if (gameDto.console?.id) game.console_id = console.id;

    game.save()

    return game;
  }
}

export const gameService = new GameService();

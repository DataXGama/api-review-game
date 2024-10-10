import { Body, Controller, Get, Patch, Path, Post, Route, Tags } from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }

  @Get("/{id}")
  public async get(@Path() gameId: number): Promise<GameDTO> {
    return gameService.getGame(gameId)
  }

  @Post("/")
  public async post(@Body() body: GameDTO): Promise<GameDTO> {
    return gameService.createGame(body);
  }

  @Patch("/{id}")
  public async patch(@Path() id: number, @Body() gameDto: GameDTO): Promise<GameDTO> {
    return gameService.updateGame(id, gameDto);
  }
}
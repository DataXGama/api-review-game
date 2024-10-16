import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";
import { ReviewDTO } from "../dto/review.dto";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }

  @Get("/{id}")
  public async get(@Path() id: number): Promise<GameDTO> {
    return gameService.getGame(id);
  }

  @Get("{id}/reviews")
  public async getReviewsFor(@Path() id: number): Promise<ReviewDTO[]> {
    return gameService.getReviewsFor(id);
  }

  // Supprime un jeu par ID
  @Delete("{id}")
  public async deleteGame(@Path() id: number): Promise<void> {
    await gameService.delete(id);
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
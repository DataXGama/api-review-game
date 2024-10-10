import { GameDTO } from "./game.dto";

export interface ReviewDTO {
    id?: number;
    rating: number;
    review_text?: string;
    game?: GameDTO;
}
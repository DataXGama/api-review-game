import { ReviewDTO } from "../dto/review.dto";
import { notFound } from "../error/NotFoundError";
import { Game } from "../models/game.model";
import { Review } from "../models/review.model";

export class ReviewService {
    public async getAll(): Promise<ReviewDTO[]> {
        return Review.findAll({
            include: [
              {
                model: Game,
                as: "game",
              },
            ],
        });
    }

    public async getById(id: number): Promise<ReviewDTO> {
        const review = await Review.findByPk(id);

        if(!review){
            throw notFound("review");
        }

        return review;
    }

    public async create(reviewDto: ReviewDTO): Promise<ReviewDTO> {
        const game = await Game.findByPk(reviewDto.game?.id)

        if(!game){
            throw notFound("game")
        }

        return Review.create({
            game_id: game.id,
            rating: reviewDto.rating,
            review_text: reviewDto.review_text
        })
    }

    public async delete(reviewId: number): Promise<void> {
        const review = await Review.findByPk(reviewId);

        if(!review){
            throw notFound("review");
        }

        review.destroy();
    }

    public async update(id: number, reviewDto: ReviewDTO): Promise<ReviewDTO> {
        const review = await Review.findByPk(id)

        if(!review) {
            throw notFound("review")
        }

        if(reviewDto.game?.id){
            const game = await Game.findByPk(reviewDto.game.id)

            if(!game){
                throw notFound("game")
            }

            review.game_id = game.id;
        }

        if(reviewDto.rating) review.rating = reviewDto.rating
        if(reviewDto.review_text) review.review_text = reviewDto.review_text

        review.save();
        return review;
    }
}

export const reviewService = new ReviewService();
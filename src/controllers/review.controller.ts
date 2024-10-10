import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";
import { reviewService } from "../services/review.service";
import { ReviewDTO } from "../dto/review.dto";
@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
    // Récupère toutes les reviews
    @Get("/")
    public async getAllReview(): Promise<ReviewDTO[]> {
        return reviewService.getAll();
    }

    // Récupère une review par ID
    @Get("{id}")
    public async getReviewById(@Path() id: number): Promise<ReviewDTO> {
        return reviewService.getById(id);
    }

    // Crée une nouvelle review
    @Post("/")
    public async createReview(
        @Body() requestBody: ReviewDTO
    ): Promise<ReviewDTO> {
        return reviewService.create(requestBody);
    }

    // Met à jour une review par ID
    @Patch("{id}")
    public async updateReview(
        @Path() id: number,
        @Body() requestBody: ReviewDTO
    ): Promise<ReviewDTO | null> {
        return reviewService.update(id, requestBody);
    }
}

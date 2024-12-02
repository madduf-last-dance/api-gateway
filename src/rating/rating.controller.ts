import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Query,
  } from "@nestjs/common";
  import { ClientProxy } from "@nestjs/microservices";
  import { ApiTags } from "@nestjs/swagger";
  import { CreateRatingDto } from "./dto/create-rating.dto";
  import { RatingType } from "./enum/rating-enum";
  
  @ApiTags("Rating")
  @Controller("rating")
  export class RatingController {
    constructor(
      @Inject("RATING_SERVICE")
      private readonly ratingClient: ClientProxy,
    ) {}
  
    @Post("/createRating")
    createRating(@Body() crDto: CreateRatingDto) {
      return this.ratingClient.send<string>("createRating", crDto);
    }
  
    @Get("/findAllRatings")
    findAllRatings() {
      return this.ratingClient.send<string>("findAllRatings", "");
    }
  
    @Get("/findRating/:id")
    findRatingById(@Param("id") id: number) {
      return this.ratingClient.send<string>("findRatingById", id);
    }

    @Get("/findRatingsByType") // To get specific reviews for accommodation or host
    findRatingsByEntity(
      @Query("entityId") entityId: number,
      @Query("type") type: RatingType,
    ) {
      return this.ratingClient.send<string>("findRatingsByType", {
        entityId,
        type,
      });
    }
  
    @Delete("/removeRating/:id")
    removeRating(@Param("id") id: number) {
      return this.ratingClient.send<string>("removeRating", id);
    }
  
    @Get("/averageRating") // Get average rating for one specific accommodation or host
    getAverageRating(@Query("entityId") entityId: number, @Query("type") type: RatingType) {
      return this.ratingClient.send<string>("getAverageRating", { entityId, type });
    }
  }
  
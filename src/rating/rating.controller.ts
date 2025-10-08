import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
  Request,
  Logger,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guard/auth.guard";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { UpdateRatingDto } from "./dto/update-rating.dto";
import { RatingType } from "./entities/rating-type.enum";

@ApiTags("Rating")
@ApiBearerAuth()
@Controller("rating")
export class RatingController {
  private readonly logger = new Logger(RatingController.name);

  constructor(
    @Inject("RATING_SERVICE")
    private readonly ratingClient: ClientProxy,
  ) {}

  // ---------- CREATE ----------
  @Post("/createRating")
  @UseGuards(AuthGuard)
  async createRating(@Body() rDto: CreateRatingDto, @Request() req) {
    const userId = req.user?.sub ?? req.user?.id;
    const payload = { ...rDto, usedId: userId };
    this.logger.log(`createRating by user ${userId} for target ${payload.ratingId}`);
    return this.ratingClient.send("createRating", payload);
  }

  // ---------- UPDATE ----------
  @ApiBody({ type: UpdateRatingDto })
  @Post("/updateRating")
  @UseGuards(AuthGuard)
  async updateRating(@Body() rDto: UpdateRatingDto & { id: number }, @Request() req) {
    const userId = req.user?.sub ?? req.user?.id;
    const payload = { id: rDto.id, usedId: userId, rating: rDto.rating };
    this.logger.log(`updateRating id=${payload.id} by user ${userId}`);
    return this.ratingClient.send("updateRating", payload);
  }

  // ---------- DELETE ----------
  @Delete(":id")
  @UseGuards(AuthGuard)
  async removeRating(@Param("id") id: string, @Request() req) {
    const userId = req.user?.sub ?? req.user?.id;
    const payload = { id: Number(id), usedId: userId };
    this.logger.log(`removeRating id=${payload.id} by user ${userId}`);
    return this.ratingClient.send("deleteRating", payload);
  }

  // ---------- GET ONE ----------
  @Get("/findOneRating/:id")
  async findOneRating(@Param("id") id: string) {
    return this.ratingClient.send("getRating", Number(id));
  }

  // ---------- GET ALL FOR TARGET ----------
  @Get("/ratingsForTarget")
  async getRatingsForTarget(
    @Query("ratingType") ratingType: string,
    @Query("ratingId") ratingId: string,
  ) {
    const payload = {
      ratingType: (RatingType as any)[ratingType] ?? ratingType,
      ratingId: Number(ratingId),
    };
    this.logger.log(`getRatingsForTarget type=${payload.ratingType} id=${payload.ratingId}`);
    return this.ratingClient.send("getRatingsForTarget", payload);
  }
}

import { IsEnum, IsInt, Min, Max, IsNotEmpty } from "class-validator";
import { RatingType } from "../enum/rating-enum";

export class CreateRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  ratedEntityId: number;

  @IsEnum(RatingType)
  ratingType: RatingType;
}

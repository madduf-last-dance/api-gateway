import { IsEnum, IsInt, IsOptional, Min, Max } from "class-validator";
import { RatingType } from "../entities/rating-type.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateRatingDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({default: 5})
  rating?: number;

  @IsOptional()
  @IsEnum(RatingType)
    @ApiProperty({
      enum: RatingType,
      example: RatingType.HOST,
      description: "Type of target being rated",
    })
  ratingType?: RatingType;
}

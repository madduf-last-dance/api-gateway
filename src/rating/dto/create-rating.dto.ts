import { IsEnum, IsInt, Min, Max } from "class-validator";
import { RatingType } from "../entities/rating-type.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({default: 5})
  @ApiProperty({ example: 5, description: "Rating value (1–5)" })
  rating: number;

  @IsInt()
  @ApiProperty({default: 1})
   @ApiProperty({ example: 42, description: "User ID of the person who gave the rating" })
  usedId: number; 

  @IsInt()
  @ApiProperty({ example: 123, description: "Target entity ID being rated (host or accommodation)" })
  ratingId: number;

  @IsEnum(RatingType)
  @ApiProperty({
    enum: RatingType,
    example: RatingType.HOST,
    description: "Type of target being rated",
  })
  ratingType: RatingType;
}

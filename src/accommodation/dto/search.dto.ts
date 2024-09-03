import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class SearchDto {
  @ApiProperty({
    default: "Zrenjanin",
  })
  location: string;

  @ApiProperty({
    default: 5,
  })
  @IsOptional()
  numberOfGuests: number;

  @ApiProperty({
    default: "2024-7-17",
  })
  startDate: Date;

  @ApiProperty({
    default: "2024-10-10",
  })
  endDate: Date;
}

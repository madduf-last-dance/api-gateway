import { ApiProperty } from "@nestjs/swagger";

export class CreateAccommodationDto {
  @ApiProperty({default: 'Kuca'})
  name: string;

  @ApiProperty({default: "Nikole Tesle1, Zrenjanin, Srbija"})
  location: string;

  @ApiProperty({default: 1})
  minimumGuests: number;

  @ApiProperty({default: 10})
  maximumGuests: number;

  @ApiProperty({default: 1})
  hostId: number;
  
  @ApiProperty({default: [1,2,3]})
  benefitIds: number[];
}

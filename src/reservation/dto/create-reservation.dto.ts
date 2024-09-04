import { ApiProperty } from "@nestjs/swagger";

export class CreateReservationDto {
  @ApiProperty({
    default: 1
  })
  accommodationId: number;

  @ApiProperty({
    default: 1
  })
  guestId: number;

  @ApiProperty({
    default: "2024-10-10"
  })
  startDate: Date;

  @ApiProperty({
    default: "2024-10-10"
  })
  endDate: Date;

  @ApiProperty({
    default: 5
  })
  guestNumber: number;
}

export class AvailabilityIdDto {
  id: number;
  accommodationId: number;
  startDate: Date;
  endDate: Date;
  price: number;
}

export class SaveAvailabilityDto {
  hostId: number;
  accommodationId: string;
  availabilities: AvailabilityIdDto;
}


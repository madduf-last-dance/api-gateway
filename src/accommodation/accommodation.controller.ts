import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

@Controller("accommodation")
export class AccommodationController {
  constructor(
    @Inject("ACCOMMODATION_SERVICE") private readonly accommodationClient: ClientProxy,
  ) {}

  @Get('/findOneAccommodation')
  findOneAccommodation() {
    return this.accommodationClient.send<string>("findOneAccommodation", 1)
  }
  @Get('/checkAvaliability')
  checkAvailability() {
      let aDto: {
        accommodationId: 1,
        endDate: "2024-01-09",
        startDate: "2024-25-08",
        price: 120,
      }
      return this.accommodationClient.send<string>("checkAvailability", aDto);
  }
  
  
}

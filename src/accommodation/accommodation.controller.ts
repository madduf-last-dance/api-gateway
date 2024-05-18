import { Body, Controller, Delete, Get, Inject, Post } from "@nestjs/common";
import { ClientProxy, MessagePattern, Payload } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Accommodation")
@Controller("accommodation")
export class AccommodationController {
  constructor(
    @Inject("ACCOMMODATION_SERVICE")
    private readonly accommodationClient: ClientProxy,
  ) {}

  @Post("/createAccommodation")
  createAccommodation(@Body() aDto: any) {
    return this.accommodationClient.send<string>("createAccommodation", aDto);
  }
  @Post("/updateAccommodation")
  updateAccommodation(@Body() aDto: any) {
    return this.accommodationClient.send<string>("updateAccommodation", aDto);
  }
  @Get("/findAllAccommodation")
  findAllAccommodation() {
    return this.accommodationClient.send<string>("findAllAccommodation", "");
  }
  @Get("/findOneAccommodation")
  findOneAccommodation() {
    return this.accommodationClient.send<string>("findOneAccommodation", 1);
  }
  @Delete("removeAccommodation")
  removeAccommodation(@Body() id: number) {
    return this.accommodationClient.send<string>("removeAccommodation", id);
  }
  @Get("/checkAvaliability")
  checkAvailability() {
    let aDto: {
      accommodationId: 1;
      endDate: "2024-01-09";
      startDate: "2024-25-08";
      price: 120;
    };
    return this.accommodationClient.send<string>("checkAvailability", aDto);
  }
}

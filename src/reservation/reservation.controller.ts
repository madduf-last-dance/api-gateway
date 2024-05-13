import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
} from "@nestjs/common";
import { ClientProxy, MessagePattern, Payload } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Reservation")
@Controller("reservation")
export class ReservationController {
  constructor(
    @Inject("RESERVATION_SERVICE")
    private readonly reservationClient: ClientProxy,
  ) {}

  @Post("/createReservation")
  create(@Body() rDto: any) {
    return this.reservationClient.send<string>("createReservation", rDto);
  }
  @Get("/findAllReservations")
  findAll() {
    return this.reservationClient.send<string>("findAllReservations", "");
  }
  @Get("/findOneReservation")
  findOne(@Body() id: number) {
    return this.reservationClient.send<string>("findOneReservation", id);
  }
  @Put("updateReservation")
  update(@Body() rDto: any) {
    return this.reservationClient.send<string>("updateReservation", rDto);
  }
  @Delete("removeReservation")
  remove(@Body() id: number) {
    return this.reservationClient.send<string>("removeReservation", id);
  }
  @Post("/reserve")
  reserve(@Body() rDto: any) {
    return this.reservationClient.send<string>("reserve", rDto);
  }
  @Delete("/cancelReservationPending")
  cancelReservationPending(@Body() reservationId: number) {
    return this.reservationClient.send<string>(
      "cancelReservationPending",
      reservationId,
    );
  }
  @Delete("/cancelReservationAccepted")
  cancelReservationAccepted(@Body() reservationId: number) {
    return this.reservationClient.send<string>(
      "cancelReservationAccepted",
      reservationId,
    );
  }
}

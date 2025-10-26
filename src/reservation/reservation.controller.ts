import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  Req,
} from "@nestjs/common";
import { ClientProxy, MessagePattern, Payload } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { AuthGuard } from "src/guard/auth.guard";
import { Roles } from "src/guard/roles.decorator";

@ApiTags("Reservation")
@Controller("reservation")
export class ReservationController {
  constructor(
    @Inject("RESERVATION_SERVICE")
    private readonly reservationClient: ClientProxy,
  ) {}

  @Post("/createReservation")
  @UseGuards(AuthGuard)
  @Roles(["GUEST"])
  create(@Body() rDto: CreateReservationDto, @Request() req) {
    const id = req["user"].sub;
    rDto.guestId = id;
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
  @Get("/findByUser/")
  @UseGuards(AuthGuard)
  @Roles(["GUEST"])
  findByUser(@Request() req) {
    const id = req["user"].sub;
    console.log(id);
    return this.reservationClient.send<string>("findAllByUser", id);
  }
  @Get("/findByAccommodation/:id")
  findByAccommodation(@Param("id") id: string) {
    return this.reservationClient.send<string>("findAllByAccommodation", id);
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
  @Delete("/cancelReservationPending/:id")
  cancelReservationPending(@Param("id") id: string) {
    return this.reservationClient.send<string>("cancelReservationPending", id);
  }
  @Delete("/cancelReservationAccepted/:id")
  cancelReservationAccepted(@Param("id") id: string) {
    return this.reservationClient.send<string>("cancelReservationAccepted", id);
  }
  @Get("/accept/:id")
  acceptReservation(@Param("id") id: string) {
    return this.reservationClient.send<string>("acceptReservation", id);
  }
  @Get("/findGuestAndAccepted/:accommodationId")
  @UseGuards(AuthGuard)
  findGuestAndAccepted(
    @Param("accommodationId") accommodationId: string,
    @Request() req,
  ) {
    const message = {
      guestId: req["user"].sub,
      accommodationId: accommodationId,
    };
    return this.reservationClient.send<string>(
      "findAllGuestAndAcceptedReservations",
      message,
    );
  }
}

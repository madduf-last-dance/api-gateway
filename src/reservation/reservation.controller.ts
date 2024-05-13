import { Body, Controller, Delete, Get, Inject, Post, Put } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reservation')
@Controller("reservation")
export class ReservationController {
  constructor(
    @Inject("RESERVATION_SERVICE") private readonly reservationClient: ClientProxy,
  ) {}

  @ApiTags('Reservation')
  @Post('/createReservation')
  create(@Body() rDto: any) {
    return this.reservationClient.send<string>("createReservation", rDto);
  }
  @ApiTags('Reservation')
  @Get('/findAllReservations')
  findAll() {
    return this.reservationClient.send<string>("findAllReservations", "");
  }
  @ApiTags('Reservation')
  @Get('/findOneReservation')
  findOne(@Body() id: number) {
    return this.reservationClient.send<string>("findOneReservation", id);
  }
  @ApiTags('Reservation')
  @Put('updateReservation')
  update(@Body() rDto: any) {
    return this.reservationClient.send<string>("updateReservation", rDto);
  }
  @ApiTags('Reservation')
  @Delete('removeReservation')
  remove(@Body() id: number) {
    return this.reservationClient.send<string>("removeReservation", id);
  }
  @ApiTags('Reservation')
  @Post('/reserve')
  reserve(@Body() rDto: any) {
    return this.reservationClient.send<string>("reserve", rDto);
  }
  @ApiTags('Reservation')
  @Delete('/cancelReservationPending')
  cancelReservationPending(@Body() reservationId: number) {
    return this.reservationClient.send<string>("cancelReservationPending", reservationId);
  }
  @ApiTags('Reservation')
  @Delete('/cancelReservationAccepted')
  cancelReservationAccepted(@Body() reservationId: number) {
    return this.reservationClient.send<string>("cancelReservationAccepted", reservationId);
  }
  
}

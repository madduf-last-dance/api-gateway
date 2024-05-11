import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { ClientProxy } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject("RESERVATION_SERVICE") private readonly reservationClient:
      ClientProxy,
  ) {}

  @Post("reserve")
  getHello(@Body() reservation: any) {
    return this.reservationClient.send<string>("reserve", reservation);
  }
}

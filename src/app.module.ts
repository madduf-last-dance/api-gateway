import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./guard/constant";
import { UserController } from "./user/user.controller";
import { ReservationController } from "./reservation/reservation.controller";
import { AccommodationController } from "./accommodation/accommodation.controller";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "3600s" },
    }),
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          port: 1313,
        },
      },
      {
        name: "ACCOMMODATION_SERVICE",
        transport: Transport.TCP,
        options: {
          port: 1312,
        },
      },
      {
        name: "RESERVATION_SERVICE",
        transport: Transport.TCP,
        options: {
          port: 1315,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: "RESERVATION_SERVICE",
        transport: Transport.TCP,
        options: {
          port: 1315,
        },
      },
    ]),
  ],
  controllers: [AppController, UserController, ReservationController, AccommodationController],
  providers: [AppService],
})
export class AppModule {}

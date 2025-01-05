import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./guard/constant";
import { UserController } from "./user/user.controller";
import { ReservationController } from "./reservation/reservation.controller";
import { AccommodationController } from "./accommodation/accommodation.controller";
import { PrometheusModule, makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { CustomRpcExceptionFilter } from "./filters/rpc-exception.filter";
import { OpenTelemetryModule } from "nestjs-otel";

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true, // Includes Host Metrics
    apiMetrics: {
      enable: true, // Includes api metrics
      defaultAttributes: {
        // You can set default labels for api metrics
        custom: 'label',
      },
      ignoreRoutes: ['/favicon.ico'], // You can ignore specific routes (See https://docs.nestjs.com/middleware#excluding-routes for options)
      ignoreUndefinedRoutes: false, //Records metrics for all URLs, even undefined ones
      prefix: 'my_prefix', // Add a custom prefix to all API metrics
    },
  },
});

@Module({
  imports: [
    OpenTelemetryModuleConfig,
    PrometheusModule.register({
    }
    ),
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
          host: 'user-service.default.svc.cluster.local',
          port: 1313,
        },
      },
      {
        name: "ACCOMMODATION_SERVICE",
        transport: Transport.TCP,
        options: {
          host: 'accommodation-service.default.svc.cluster.local',
          port: 1312,
        },
      },
      {
        name: "RESERVATION_SERVICE",
        transport: Transport.TCP,
        options: {
          host: 'reservation-service.default.svc.cluster.local',
          port: 1315,
        },
      },
    ]),
  ],
  controllers: [
    AppController,
    UserController,
    ReservationController,
    AccommodationController,
  ],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CustomRpcExceptionFilter,
    },
    makeCounterProvider({
      name: 'http_request_total',
      help: 'Total of HTTP request',
      labelNames: ['route', 'method', 'code'],
    }),
    makeCounterProvider({
      name: 'unique_visitors',
      help: 'Number of unique visitors (ip, timestamp, browser)',
      labelNames: ['ip', 'timestamp', 'browser'],
    }),
    makeCounterProvider({
      name: 'node_network_receive_bytes_total',
      help: 'Total number of bytes received on the network',
      labelNames: ['interface'],
    })

  ],
})
export class AppModule {}

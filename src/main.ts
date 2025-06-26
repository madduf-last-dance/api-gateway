import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger, ValidationPipe } from "@nestjs/common";
import { CustomRpcExceptionFilter } from "./filters/rpc-exception.filter";
import { LoggingInterceptor } from "./logging.interceptor";
import otelSDK from "./tracing/tracing";
import { urlencoded, json } from 'express';

async function bootstrap() {
  await otelSDK.start();

  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle("Reservation App API")
    .setDescription(
      "API for managing reservations and accommodations for users",
    )
    .setVersion("0.1")
    .addBearerAuth()
    .addTag("User", "Endpoints related to user management")
    .addTag("Reservation", "Endpoints related to reservation management")
    .addTag("Accommodation", "Endpoints related to accommodation management")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  console.log(process.env.JAEGER_ENDPOINT);
  app.useLogger(new Logger());
  app.useGlobalPipes(new ValidationPipe());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(8080);
}
bootstrap();

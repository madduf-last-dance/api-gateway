import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
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
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

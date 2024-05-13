import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Reservation API')
    .setDescription('API for managing reservations')
    .setVersion('0.1')
    .addBearerAuth()
    .addTag('Reservation', 'Endpoints related to reservation management')
    .setTitle('Accommodation API')
    .setDescription('API for managing accommodations')
    .setVersion('0.1')
    .addBearerAuth()
    .addTag('Accommodation', 'Endpoints related to accommodation management')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

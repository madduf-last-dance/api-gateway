import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { map } from "rxjs/operators";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello().pipe(
      map((response) => response),
    );
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
  Request,
  Logger,
} from "@nestjs/common";
import { ClientProxy, MessagePattern, Payload } from "@nestjs/microservices";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateAccommodationDto } from "./dto/create-accommodation.dto";
import { SearchDto } from "./dto/search.dto";
import { AuthGuard } from "src/guard/auth.guard";
import { Roles } from "src/guard/roles.decorator";
import { SaveAvailabilityDto } from "./dto/save-availability.dto";
import { LoggingInterceptor } from "src/logging.interceptor";

@ApiTags("Accommodation")
@ApiBearerAuth()
@Controller("accommodation")
export class AccommodationController {
  private readonly logger = new Logger(LoggingInterceptor.name);
  constructor(
    @Inject("ACCOMMODATION_SERVICE")
    private readonly accommodationClient: ClientProxy,
  ) {}

  @Post("/createAccommodation")
  createAccommodation(@Body() aDto: CreateAccommodationDto) {
    return this.accommodationClient.send<string>("createAccommodation", aDto);
  }
  @Post("/updateAccommodation")
  updateAccommodation(@Body() aDto: any) {
    return this.accommodationClient.send<string>("updateAccommodation", aDto);
  }
  @Get("/findAllAccommodation")
  findAllAccommodation() {
    return this.accommodationClient.send<string>("findAllAccommodation", "");
  }
  @Get("/findOneAccommodation/:id")
  findOneAccommodation(@Param("id") id: string) {
    return this.accommodationClient.send<string>("findOneAccommodation", id);
  }
  @Get("/findAllAccommodationsHost")
  @UseGuards(AuthGuard)
  @Roles(["HOST"])
  findAllByHost(@Request() req) {
    const id = req["user"].sub;
    return this.accommodationClient.send<string>(
      "findAllAccommodationsHost",
      id,
    );
  }
  @Delete(":id")
  @UseGuards(AuthGuard)
  @Roles(["HOST"])
  async removeAccommodation(
    @Request() req,
    @Param("id") id: number,
  ): Promise<void> {
    const userId = req["user"].sub;
    const payload = {
      hostId: userId,
      id: id,
    };
    return this.accommodationClient
      .send<void>("removeAccommodation", payload)
      .toPromise();
  }
  @Get("/checkAvaliability")
  checkAvailability() {
    let aDto: {
      accommodationId: 1;
      endDate: "2024-01-09";
      startDate: "2024-25-08";
      price: 120;
    };
    return this.accommodationClient.send<string>("checkAvailability", aDto);
  }
  @Get("/search")
  search(@Query() dto: SearchDto) {
    return this.accommodationClient.send<string>("search", dto);
  }
  @Post("/saveAvailabilities/:id")
  @UseGuards(AuthGuard)
  @Roles(["HOST"])
  async saveAvailabilities(
    @Request() req: any,
    @Param("id") accommodationId: string,
    @Body() availabilites: any,
  ): Promise<void> {
    const hostId = req["user"].sub;
    const payload: SaveAvailabilityDto = {
      hostId: hostId,
      accommodationId: accommodationId,
      availabilities: availabilites,
    };
    this.accommodationClient.send<string>("saveAvailabilities", payload);
  }
  @Get("/getAllBenefits")
  @UseGuards(AuthGuard)
  @Roles(["HOST"])
  async getAllBenefits() {
    return this.accommodationClient.send<string>("allBenefits", {});
  }
}

import { Body, Controller, Get, Inject, Post, UseGuards, Request, UseFilters, Delete, Param, HttpException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "src/guard/auth.guard";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { UpdateUserDto } from "./dtos/update.dto";
import { UpdateCredentialsDto } from "./dtos/update-credentials.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/guard/roles.decorator";
import { firstValueFrom } from "rxjs";

@ApiTags("User")
@ApiBearerAuth()
@Controller("user")
export class UserController {
  constructor(
    @Inject("USER_SERVICE") private readonly userClient: ClientProxy,
  ) {}
  @Post("/login")
  async login(@Body() loginDto: LoginDto) {
    const response = await firstValueFrom(this.userClient.send<string>("login", loginDto));
    return response;
  }
  @Post("/register/guest")
  registerGuest(@Body() registerDto: RegisterDto) {
    return this.userClient.send<string>("registerGuest", registerDto);
  }
  @Post("/register/host")
  registerHost(@Body() registerDto: RegisterDto) {
    return this.userClient.send<string>("registerHost", registerDto);
  }
  @Post("/update")
  @UseGuards(AuthGuard)
  update(@Request() req, @Body() updateDto: UpdateUserDto) {
    updateDto.id = req["user"].sub;
    updateDto.username = req["user"].username;
    console.log(updateDto,req["user"]);
    return this.userClient.send<string>("updateUser", updateDto);
  }
  @Post("/updateCredentials")
  @UseGuards(AuthGuard)
  updateCredentials(@Request() req, @Body() updateDto: UpdateCredentialsDto) {
    updateDto.id = req["user"].sub;
    return this.userClient.send<string>("updateCredentials", updateDto);
  }
  @Get("/test")
  @Roles(['HOST'])
  @UseGuards(AuthGuard)
  getTest() {
    return "nikola";
  }
  @Get("/profile")
  @UseGuards(AuthGuard)
  profile(@Request() req) {
    return this.userClient.send<any>("findOneUser", req["user"].username)
  }
  @Delete("/removeUser/:id")
  async removeUser(@Param('id') userId: string) {
    try {
      return await this.userClient.send<any>("removeUser", userId).toPromise();
    } catch (error) {
      // Forward microservice error as HTTP exception
      throw new HttpException(error.message || 'Failed to delete user', error.code || 500);
    }
  }
}

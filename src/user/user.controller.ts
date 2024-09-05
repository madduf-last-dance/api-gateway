import { Body, Controller, Get, Inject, Post, UseGuards, Request } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "src/guard/auth.guard";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { UpdateUserDto } from "./dtos/update.dto";
import { Role } from "./dtos/role.enum";
import { UpdateCredentialsDto } from "./dtos/update-credentials.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@ApiBearerAuth()
@Controller("user")
export class UserController {
  constructor(
    @Inject("USER_SERVICE") private readonly userClient: ClientProxy,
  ) {}
  @Post("/login")
  login(@Body() loginDto: LoginDto) {
    return this.userClient
      .send<string>("login", loginDto)
      .pipe((response) => response);
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
  update(@Body() updateDto: UpdateUserDto) {
    return this.userClient.send<string>("updateUser", updateDto);
  }
  @Post("/updateCredentials")
  @UseGuards(AuthGuard)
  updateCredentials(@Request() req, @Body() updateDto: UpdateCredentialsDto) {
    updateDto.id = req["user"].id;
    return this.userClient.send<string>("updateCredentials", updateDto);
  }
  @Get("/test")
  @UseGuards(AuthGuard)
  getTest() {
    return "nikola";
  }
}

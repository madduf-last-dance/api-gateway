import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGuard } from "src/guard/auth.guard";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { register } from "module";

@Controller("user")
export class UserController {
  constructor(
    @Inject("USER_SERVICE") private readonly userClient: ClientProxy,
  ) {}
  @Post("/login")
  login(@Body() loginDto: LoginDto) {
    return this.userClient
      .send<string>("login", loginDto)
      .pipe(
        (response) => response,
      );
  }
  @Post("/register")
  register(@Body() registerDto: RegisterDto) {
    return this.userClient
      .send<string>("register", registerDto);
  }
  @Get("/test")
  @UseGuards(AuthGuard)
  getTest() {
    return "nikola";
  }
}

import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AppService {
  constructor(
    @Inject("USER_SERVICE") private readonly userClient: ClientProxy,
  ) {}

  async login(loginDto: any) {
    try {
      return this.userClient.send<string>("login", loginDto);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("Invalid username or password");
    }
  }
  async getHello() {
    return this.userClient.send<string>("login", {
      username: "nikola",
      password: "123",
    });
  }
  getById() {
    return this.userClient.send<string>("findOneUser", 1);
  }
}

import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AppService {
  constructor(
    @Inject("USER_SERVICE") private readonly userClient: ClientProxy,
  ) {}
  getHello() {
    return this.userClient.send<string>("findAllUser", {
      "pera": "pema",
      "aca": ["coa", "diploma", 123],
    });
  }
  getById() {
    return this.userClient.send<string>("findOneUser", 1);
  }
}

import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "./role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

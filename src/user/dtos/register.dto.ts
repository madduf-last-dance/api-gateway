import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

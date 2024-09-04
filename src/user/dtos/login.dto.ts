import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({
    default: "nikola"
  })
  username: string;
  @IsNotEmpty()
  @ApiProperty({
    default: "123"
  })
  password: string;
}

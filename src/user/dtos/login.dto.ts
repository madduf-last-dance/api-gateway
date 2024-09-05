import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @ApiProperty({
    default: "nikola"
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @ApiProperty({
    default: "123"
  })
  password: string;
}

import { OmitType, PartialType } from "@nestjs/mapped-types";
import { RegisterDto } from "./register.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(
  OmitType(RegisterDto, ["password"] as const),
) {
  @ApiProperty()
  id: number;

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

import { ApiProperty } from "@nestjs/swagger";

export class UpdateCredentialsDto {
  @ApiProperty(
    {default: "nikola"}
  )
  username: string;

  @ApiProperty(
    {default: "123"}
  )
  password: string;

  id: number;
}

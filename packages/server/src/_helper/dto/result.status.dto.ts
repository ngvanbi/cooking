import { ApiProperty } from '@nestjs/swagger';

export class ResultStatusDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message?: string;
}

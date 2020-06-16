import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRoleEntity } from '@users/entity/user.role.entity';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  onlineAt: Date;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  role: UserRoleEntity;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  updated: Date;
}

import { UserDto } from '@users/dto/user.dto';
import { UserEntity } from '@users/entity/user.entity';

export const toUserDto = (data: UserEntity): UserDto => {
  const { ...userDto } = data;
  delete userDto['password'];

  return userDto;
};

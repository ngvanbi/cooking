import { Injectable } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { UserDto } from '@users/dto/user.dto';
import { toUserDto } from '@helper/dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserDto> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isPass = await user.checkPassword(pass);
      if (isPass) {
        return toUserDto(user);
      }
    }
    return null;
  }

  async login(userDto: UserDto) {
    const { id, email, firstName, lastName, role } = userDto;
    let roleName = '';
    if (role) {
      roleName = role.roleName;
    }
    const user = { id, email, firstName, lastName, role: roleName };
    return {
      accessToken: this.jwtService.sign(user),
    };
  }
}

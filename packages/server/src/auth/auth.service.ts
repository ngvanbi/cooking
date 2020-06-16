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

  async createAuthToken(userDto: UserDto) {
    const { id, email, role } = userDto;
    let roleName = '';
    if (role) {
      roleName = role.roleName;
    }
    const user = { sub: id, email, role: roleName };

    return {
      expiresIn: new Date().getTime(),
      accessToken: this.jwtService.sign(user),
      refreshToken: this.jwtService.sign({ id }),
    };
  }

  async validateJwt(id: number) {
    return await this.usersService.findOneById(id);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { toUserDto } from '@helper/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(options?: object): Promise<UserEntity> {
    return this.userRepository.findOne(options);
  }

  async findOneById(id: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      // Need to check user
      return user;
    } catch (e) {
      throw new HttpException(
        {
          error: 'Database',
          message: 'Item not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async create(userCreate: UserCreateDto): Promise<UserDto> {
    const { email } = userCreate;
    const userInDB = await this.userRepository.findOne({ where: { email } });
    if (userInDB) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = this.userRepository.create({
      ...userCreate,
    });
    await this.userRepository.save(user);
    return toUserDto(user);
  }
}

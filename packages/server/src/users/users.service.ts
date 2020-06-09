import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {UserEntity} from './entity/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {UserCreateDto} from "./dto/user.create.dto";
import {UserDto} from "./dto/user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {
    }

    findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    findOne(options?: object): Promise<UserEntity> {
        return this.userRepository.findOne(options);
    }

    findByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOne({where: {email}});
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    async create(userCreate: UserCreateDto): Promise<UserDto> {
        const {email} = userCreate;
        const userInDB = await this.userRepository.findOne({where: {email}});
        if (userInDB) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user: UserEntity = await this.userRepository.create({...userCreate})
        await this.userRepository.save(user);
        const userDto: UserDto = {...user};
        delete userDto['password']
        return userDto;
    }

}

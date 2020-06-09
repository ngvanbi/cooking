import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user.create.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ResultStatusDto } from '@helper/dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({ required: true, type: UserCreateDto })
  @ApiResponse({ status: 201, description: 'CREATED', type: ResultStatusDto })
  async create(@Body() data: UserCreateDto): Promise<ResultStatusDto> {
    let status: ResultStatusDto = {
      success: true,
      message: 'User registered',
    };
    try {
      await this.usersService.create(data);
    } catch (err) {
      status = {
        success: false,
        message: err.message,
      };
    }

    return status;
  }
}

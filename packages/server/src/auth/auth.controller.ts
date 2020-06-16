import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@auth/guards/local-auth.guard';
import { AuthService } from '@auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.createAuthToken(req.user);
  }
}

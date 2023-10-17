import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { Public } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.user, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.username);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

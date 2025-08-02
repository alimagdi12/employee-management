/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto/signup.dto';
import { LoginDto } from './dto/login.dto/login.dto';
import { ForgotPasswordDto } from './dto/forget-password/forget-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('forget-password')
  @UsePipes(new ValidationPipe({ transform: true }))
  async forgetPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgetPassword(dto);
  }

  @Get('user')
  async getUser(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('رمز الدخول مطلوب | Token is required');
    }
    const token = authHeader.split(' ')[1];
    return this.authService.getUser(token);
  }
}
import { JwtPayload } from './../../../node_modules/@types/jsonwebtoken/index.d';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { AuthResponseDto } from './dto/login-res.dto';
import { RegisterDto } from './dto/register-dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() credentials: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(credentials.username, credentials.password);
  }
  @Post('register')
  register(@Body() user: RegisterDto): Promise<JwtPayload> {
    return this.authService.register(user.username, user.password);
  }
  @Get('check-token')
  @UseGuards(AuthGuard)
  checkToken(@Body() payload: JwtPayload) {
    return true;
  }
}

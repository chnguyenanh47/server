import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import path from 'path';
import * as fs from 'fs/promises';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto } from './dto/login-res.dto';

@Injectable()
export class AuthService {
  private users: UserDto[] = [];
  private relativePath: string = './src/data/users.json';
  constructor(private readonly jwtService: JwtService) {}

  async login(username: string, password: string): Promise<AuthResponseDto> {
    await this.loadUsersFromFile();

    const user = this.users.find((user) => user.username === username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1m',
    });
    user.accessToken = accessToken;
    await this.saveUsersToFile();
    return {
      message: 'Login successful',
      accessToken,
    };
  }

  async register(username: string, password: string) {
    await this.loadUsersFromFile();
    const existingUser = this.users.find((user) => user.username === username);
    if (existingUser) {
      throw new BadRequestException('Username is already taken');
    }
    const hashedPassword = await this.hashPassword(password);
    const newUser: UserDto = {
      username,
      password: hashedPassword,
      id: 1,
    };
    this.users.push(newUser);
    await this.saveUsersToFile();
    return { message: 'User registered successfully' };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
  private async saveUsersToFile() {
    const fullPath = path.join(process.cwd(), this.relativePath);

    try {
      await fs.writeFile(
        fullPath,
        JSON.stringify(this.users, null, 2),
        'utf-8',
      );
      console.log('Users data saved successfully.');
    } catch (error) {
      console.error('Error saving users data:', error);
      throw new BadRequestException('Unable to save users data');
    }
  }
  private async loadUsersFromFile() {
    const fullPath = path.join(process.cwd(), this.relativePath);
    try {
      const rawData = await fs.readFile(fullPath, 'utf-8');
      const jsonData = JSON.parse(rawData);
      if (Array.isArray(jsonData)) {
        this.users = jsonData;
      } else {
        this.users = [];
      }
    } catch (error) {
      console.error('Error reading or parsing the file:', error);
      throw new BadRequestException('Unable to load users data');
    }
  }
}

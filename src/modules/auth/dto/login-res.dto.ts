import { IsString } from 'class-validator';

export class AuthResponseDto {
  @IsString()
  message: string;

  @IsString()
  accessToken: string;
}

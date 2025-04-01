import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  Matches,
} from 'class-validator';

export class UserDto {
  @IsInt()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message:
      'Username must contain only letters and numbers, without spaces or special characters',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/-]+$/, {
    message:
      'Password must contain only letters, numbers, and special characters, without spaces',
  })
  password: string;

  @IsString()
  accessToken?: string;
}

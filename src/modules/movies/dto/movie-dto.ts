import {
  IsInt,
  IsString,
  IsDateString,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class MovieDto {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsString()
  genre: string;

  @IsDateString()
  releaseDate: string;

  @IsInt()
  duration: number;

  @IsString()
  director: string;

  @IsString()
  cast: string;

  @IsNumber()
  rating: number;

  @IsUrl()
  poster: string;

  @IsString()
  description: string;
}

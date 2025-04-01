import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class UpdateMovieDto {
  @IsInt()
  @Min(0)
  id: number;
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  @Min(1800)
  @Max(new Date().getFullYear())
  year?: number;

  @IsOptional()
  @IsString()
  genre?: string;
}

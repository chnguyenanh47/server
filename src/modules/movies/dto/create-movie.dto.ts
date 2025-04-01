import { IsString, IsInt, Min, Max, IsUUID, IsOptional } from 'class-validator';
import { GenerateId } from 'src/decorator/generate-id.decorator';

export class CreateMovieDto {
  @GenerateId()
  @IsOptional()
  id?: number;

  @IsString()
  title: string;

  @IsInt()
  @Min(1800)
  @Max(new Date().getFullYear())
  year: number;

  @IsString()
  genre: string;
}

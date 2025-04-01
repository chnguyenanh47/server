import { Type } from 'class-transformer';
import { IsInt, Min, IsOptional, IsString } from 'class-validator';
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
} from 'src/constant/pagination.constants';

export class PagePaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = DEFAULT_PAGINATION_PAGE;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = DEFAULT_PAGINATION_LIMIT;

  @IsOptional()
  @IsString()
  @Type(() => String)
  search?: string = '';
}

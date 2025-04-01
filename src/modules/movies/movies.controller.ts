import { Controller, Get, Query, Put, Patch, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { PagePaginationDto } from 'src/commom/dto/cursor-pagination.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getMovies(@Query() query: PagePaginationDto) {
    return await this.moviesService.findAll(query);
  }

  @Put(':id')
  async update(@Body() updateMovieDto: UpdateMovieDto) {
    return await this.moviesService.update(updateMovieDto);
  }
}

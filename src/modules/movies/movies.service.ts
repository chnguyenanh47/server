import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { MovieDto } from './dto/movie-dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PagePaginationDto } from 'src/commom/dto/cursor-pagination.dto';
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
} from 'src/constant/pagination.constants';
import { paginate } from './interfaces/pagination.interface';

@Injectable()
export class MoviesService {
  private movies: MovieDto[] = [];

  constructor() {}
  private async loadMoviesFromFile() {
    const relativePath = './src/data/movies.json';
    const fullPath = path.join(process.cwd(), relativePath);
    try {
      const rawData = await fs.readFile(fullPath, 'utf-8');
      const jsonData = JSON.parse(rawData);
      if (Array.isArray(jsonData)) {
        this.movies = jsonData;
      } else {
        this.movies = [];
      }
    } catch (error) {
      console.error('Lỗi đọc file json', error);
      throw new BadRequestException('Unable to load movies data');
    }
  }

  async findAll(paginationDto: PagePaginationDto) {
    await this.loadMoviesFromFile();
    const {
      page = DEFAULT_PAGINATION_PAGE,
      limit = DEFAULT_PAGINATION_LIMIT,
      search = '',
    } = paginationDto;
    let filteredMovies = this.movies;
    if (search) {
      filteredMovies = this.movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (!filteredMovies.length) {
      throw new NotFoundException(
        'No movies found matching the search criteria',
      );
    }
    return paginate(
      filteredMovies,
      page,
      limit,
      'Movies retrieved successfully',
    );
  }

  async update(updateMovieDto: UpdateMovieDto) {
    const { id, ...updateData } = updateMovieDto;

    if (!id) {
      throw new BadRequestException('Movie ID is required');
    }
    await this.loadMoviesFromFile();
    const movieIndex = this.movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    Object.assign(this.movies[movieIndex], updateData);
    try {
      const updatedData = JSON.stringify(this.movies);
      await fs.writeFile(
        path.join(process.cwd(), './src/data/movies.json'),
        updatedData,
        'utf-8',
      );
    } catch (writeError) {
      console.error('Lỗi cập nhật file', writeError);
    }

    return {
      message: 'Movie updated successfully',
      meta: this.movies[movieIndex],
    };
  }
}

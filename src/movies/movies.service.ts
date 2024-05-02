import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<CreateMovieDto> {
    return await this.moviesRepository.save(createMovieDto);
  }

  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    return this.moviesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = this.moviesRepository.findOne({ where: { id } });
    return this.moviesRepository.save({
      ...movie,
      ...updateMovieDto,
    });
  }

  async remove(id: number) {
    return this.moviesRepository.delete({ id });
  }
}

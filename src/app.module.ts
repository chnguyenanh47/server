import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './modules/movies/movies.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [MoviesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

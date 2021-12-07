import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { PrismaService } from './common/prisma.service';
import { UsersService } from './users/users.service';
import { TracksModule } from './tracks/tracks.module';
import { TracksController } from './tracks/tracks.controller';
import { TracksService } from './tracks/tracks.service';

@Module({
  imports: [UsersModule, TracksModule],
  controllers: [AppController, UsersController, TracksController],
  providers: [AppService, UsersService, TracksService, PrismaService],
})
export class AppModule {}

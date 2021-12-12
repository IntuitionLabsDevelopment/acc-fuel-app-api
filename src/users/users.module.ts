import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../common/prisma.service';
import { SimsService } from '../common/sims/sims.service';
import { TracksService } from '../tracks/tracks.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, SimsService, TracksService],
})
export class UsersModule {}

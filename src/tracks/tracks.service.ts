import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Prisma, Track } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTrackDto: CreateTrackDto) {
    return 'This action adds a new track';
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findById(id: number) {
    return this.prisma.track.findUnique({
      where: {
        trackId: id,
      },
    });
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma, Track } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackDto: Prisma.TrackCreateInput): Promise<Track> {
    return this.prisma.track.create({ data: createTrackDto });
  }

  async findAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async findById(id: number): Promise<Track> {
    return this.prisma.track.findUnique({
      where: {
        trackId: id,
      },
    });
  }

  async findBySim(simId: number): Promise<any> {
    return this.prisma.track.findMany({
      where: {
        simId: simId,
      },
    });
  }

  async update(
    id: number,
    updateTrackDto: Prisma.TrackUpdateInput,
  ): Promise<Track> {
    return this.prisma.track.update({
      where: {
        trackId: id,
      },
      data: updateTrackDto,
    });
  }

  async remove(id: number): Promise<Track> {
    return this.prisma.track.delete({
      where: {
        trackId: id,
      },
    });
  }
}

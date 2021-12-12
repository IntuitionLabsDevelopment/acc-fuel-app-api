import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { SimsService } from '../common/sims/sims.service';
import { TracksService } from '../tracks/tracks.service';
import { PrismaService } from '../common/prisma.service';
import { UserObject } from './userObject.model';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly simsService: SimsService,
    private readonly tracksService: TracksService,
  ) {}
  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        userId: true,
        userLaps: true,
      },
    });
  }

  async findOne(id: number): Promise<UserObject> {
    const userObj = await this.prisma.user.findUnique({
      where: { userId: id },
      select: {
        userId: true,
        userEmail: true,
        userName: true,
        sims: {
          select: {
            simId: true,
            simName: true,
            trackSims: {
              select: {
                simId: true,
                trackId: true,
              },
            },
          },
        },
        userLaps: {
          select: {
            lapId: true,
            sim: true,
            car: true,
            conditions: true,
            minutes: true,
            seconds: true,
            milliseconds: true,
          },
        },
      },
    });
    const allSims = await this.simsService.findAll();
    const allTracks = await this.tracksService.findAllBySim();

    return {
      userId: userObj.userId,
      userEmail: userObj.userEmail,
      userName: userObj.userName,
      sims: allSims.map((sim) => {
        const userSim = userObj.sims.find(
          (userSim) => userSim.simId === sim.simId,
        );
        if (userSim) {
          return {
            simId: userSim.simId,
            simName: userSim.simName,
            trackSims: userSim.trackSims.map((trackSim) => {
              return {
                simId: trackSim.simId,
              };
            }),
          };
        } else {
          const filteredTracks = allTracks.filter(
            (track) => track.simId === sim.simId,
          );

          if (filteredTracks) {
            return {
              simId: sim.simId,
              simName: sim.simName,
              tracks: filteredTracks.map((track) => {
                return {
                  trackId: track.track.trackId,
                  trackName: track.track.trackName,
                  tracklength: track.track.trackLength,
                  trackLocation: track.track.trackLocation,
                };
              }),
            };
          }
        }
      }),
    };
  }

  async update(
    id: number,
    updateUserDto: Prisma.UserUpdateInput,
  ): Promise<User> {
    return await this.prisma.user.update({
      where: { userId: id },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { userId: id } });
  }
}

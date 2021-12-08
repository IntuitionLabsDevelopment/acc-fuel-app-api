import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Sim } from '@prisma/client';

@Injectable()
export class SimsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Sim[]> {
    return await this.prisma.sim.findMany();
  }

  async findOne(id: string): Promise<Sim> {
    return await this.prisma.sim.findUnique({
      where: {
        simId: Number(id),
      },
    });
  }

  async create(simName: string): Promise<Sim> {
    const data: Prisma.SimCreateInput = {
      simName,
    };
    return await this.prisma.sim.create({ data });
  }

  async update(id: number, simName: string): Promise<Sim> {
    const data = {
      simName,
    };
    return await this.prisma.sim.update({
      where: {
        simId: id,
      },
      data,
    });
  }

  async delete(id: number): Promise<Sim> {
    return await this.prisma.sim.delete({
      where: {
        simId: id,
      },
    });
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { SimsService } from './sims.service';
import { PrismaService } from '../prisma.service';

describe('SimsService', () => {
  let service: SimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimsService],
    })
      .useMocker((token) => {
        if (token === PrismaService) {
          return {
            sim: {
              findMany: jest.fn().mockResolvedValue([
                {
                  simId: '1',
                  simName: 'Sim 1',
                },
                {
                  simId: '2',
                  simName: 'Sim 2',
                },
              ]),
              findUnique: jest.fn().mockResolvedValue({
                simId: '1',
                simName: 'Sim 1',
              }),
              create: jest.fn().mockResolvedValue({
                simId: '1',
                simName: 'Sim 1',
              }),
              update: jest.fn().mockResolvedValue({
                simId: '1',
                simName: 'Sim 1',
              }),
            },
          };
        }
      })
      .compile();

    service = module.get<SimsService>(SimsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all sims', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      {
        simId: '1',
        simName: 'Sim 1',
      },
      {
        simId: '2',
        simName: 'Sim 2',
      },
    ]);
  });

  it('should return a sim', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual({
      simId: '1',
      simName: 'Sim 1',
    });
  });

  it('should create a sim', async () => {
    const simName = 'Sim 1';
    const result = await service.create(simName);
    expect(result).toEqual({
      simId: '1',
      simName: 'Sim 1',
    });
  });

  it('should update sim', async () => {
    const simName = 'Sim 1';
    const result = await service.update(1, simName);
    expect(result).toEqual({
      simId: '1',
      simName: 'Sim 1',
    });
  });
});

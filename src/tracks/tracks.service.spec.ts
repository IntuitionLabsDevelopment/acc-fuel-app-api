import { Test, TestingModule } from '@nestjs/testing';
import { TracksService } from './tracks.service';
import { Track, Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';

const tracks: Track[] = [
  {
    trackId: 1,
    trackName: 'Track 1',
    trackLocation: 'Track 1 location',
    trackLength: 1,
    trackType: 'Road',
    simId: 1,
  },
  {
    trackId: 2,
    trackName: 'Track 2',
    trackLocation: 'Track 2 location',
    trackLength: 2,
    trackType: 'Road',
    simId: 1,
  },
];

describe('TracksService', () => {
  let service: TracksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TracksService],
    })
      .useMocker((token) => {
        if (token === PrismaService) {
          return {
            track: {
              findMany: jest.fn().mockResolvedValue(tracks),
              findUnique: jest.fn().mockResolvedValue(tracks[0]),
            },
          };
        }
      })
      .compile();

    service = module.get<TracksService>(TracksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all tracks', async () => {
    expect(await service.findAll()).toEqual(tracks);
  });

  it('should find unique track by id', async () => {
    expect(await service.findById(1)).toEqual(tracks[0]);
  });
});

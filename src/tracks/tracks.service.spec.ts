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
  },
  {
    trackId: 2,
    trackName: 'Track 2',
    trackLocation: 'Track 2 location',
    trackLength: 2,
    trackType: 'Road',
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
              create: jest.fn().mockResolvedValue(tracks[0]),
              update: jest.fn().mockResolvedValue(tracks[0]),
              delete: jest.fn().mockResolvedValue(tracks[0]),
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

  it('should create a new track', async () => {
    const newTrack: Prisma.TrackCreateInput = {
      trackName: 'Track 3',
      trackLocation: 'Track 3 location',
      trackLength: 3,
      trackType: 'Road',
    };

    expect(await service.create(newTrack)).toEqual(tracks[0]);
  });

  it('should update a track', async () => {
    const updatedTrack: Prisma.TrackUpdateInput = {
      trackName: 'Track 1',
      trackLocation: 'Track 1 location',
      trackLength: 1,
      trackType: 'Road',
    };
    expect(await service.update(1, updatedTrack)).toEqual(tracks[0]);
  });

  it('should delete a track', async () => {
    expect(await service.remove(1)).toEqual(tracks[0]);
  });
});

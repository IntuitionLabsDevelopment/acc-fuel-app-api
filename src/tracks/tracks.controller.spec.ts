import { Test, TestingModule } from '@nestjs/testing';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { Prisma, Track } from '@prisma/client';

describe('TracksController', () => {
  let controller: TracksController;

  const track: Track = {
    trackId: 1,
    trackName: 'test',
    trackLength: 2.4,
    trackLocation: 'USA',
    trackType: 'Road',
    simId: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TracksController],
      providers: [],
    })
      .useMocker((token) => {
        if (token === TracksService) {
          return {
            findAll: jest.fn().mockResolvedValue([track]),
            findById: jest.fn().mockResolvedValue(track),
            create: jest.fn().mockResolvedValue(track),
            update: jest.fn().mockResolvedValue(track),
            remove: jest.fn().mockResolvedValue(track),
          };
        }
      })
      .compile();

    controller = module.get<TracksController>(TracksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a track', async () => {
    const newTrack: Prisma.TrackCreateInput = {
      trackName: 'test',
      trackLength: 2.4,
      trackLocation: 'USA',
      trackType: 'Road',
    };
    const result = await controller.create(newTrack);
    expect(result).toBe(track);
  });

  it('should return an array of tracks', async () => {
    expect(await controller.getTracks()).toBeDefined();
    expect(await controller.getTracks()).toEqual([track]);
  });

  it('should return get track by id', async () => {
    expect(await controller.findOne('1')).toBeDefined();
    expect(await controller.findOne('1')).toEqual(track);
  });

  it('should update track', async () => {
    const updatedTrack: Prisma.TrackUpdateInput = {
      trackName: 'test',
      trackLength: 2.4,
      trackLocation: 'USA',
      trackType: 'Road',
    };
    const result = await controller.update('1', updatedTrack);
    expect(result).toBe(track);
  });

  it('should delete track', async () => {
    const result = await controller.remove('1');
    expect(result).toBe(track);
  });
});

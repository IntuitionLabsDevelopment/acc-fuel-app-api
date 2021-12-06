import { Test, TestingModule } from '@nestjs/testing';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

describe('TracksController', () => {
  let controller: TracksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TracksController],
      providers: [],
    })
      .useMocker((token) => {
        if (token === TracksService) {
          return {
            findAll: () => {
              return 'test';
            },
          };
        }
      })
      .compile();

    controller = module.get<TracksController>(TracksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of tracks', () => {
    expect(controller.getTracks()).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

describe('UsersController', () => {
  let controller: UsersController;

  const userObj: User[] = [
    { userId: 1, userName: 'test', userEmail: 'email' },
    { userId: 2, userName: 'test2', userEmail: 'email2' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    })
      .useMocker((token) => {
        if (token === UsersService) {
          return {
            findAll: jest.fn().mockResolvedValue(userObj),
            findOne: jest.fn().mockResolvedValue(userObj[0]),
            create: jest.fn().mockResolvedValue({
              userId: 3,
              userName: 'test3',
              userEmail: 'email3',
            }),
            update: jest.fn().mockResolvedValue({
              userId: 1,
              userName: 'test3',
              userEmail: 'email3',
            }),
            remove: jest.fn().mockResolvedValue(userObj[0]),
          };
        }
      })
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    const result = await controller.findAll();
    expect(result.length).toBeGreaterThan(1);
  });

  it('should return user by userID', async () => {
    const result = await controller.findOne('1');
    expect(result.userId).toBe(userObj[0].userId);
    expect(result.userName).toBe(userObj[0].userName);
    expect(result.userEmail).toBe(userObj[0].userEmail);
    expect(result).toEqual(userObj[0]);
  });

  it('should create new user', async () => {
    const result = await controller.create({
      userName: 'test3',
      userEmail: 'email3',
    });
    expect(result.userId).toBe(3);
    expect(result.userName).toBe('test3');
    expect(result.userEmail).toBe('email3');
  });

  it('should update the user', async () => {
    const result = await controller.update('1', {
      userName: 'test3',
      userEmail: 'email3',
    });
    if (typeof result !== 'string') {
      expect(result.userId).toBe(1);
      expect(result.userName).toBe('test3');
      expect(result.userEmail).toBe('email3');
    }
  });

  it('should remove the user', async () => {
    const result = await controller.remove('1');
    expect(result.userId).toBe(1);
    expect(result.userName).toBe('test');
    expect(result.userEmail).toBe('email');
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;

  const userObj: User[] = [
    { userID: 1, userName: 'test', email: 'email' },
    { userID: 2, userName: 'test2', email: 'email2' },
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
              userID: 3,
              userName: 'test3',
              email: 'email3',
            }),
            update: jest.fn().mockResolvedValue({
              userID: 1,
              userName: 'test3',
              email: 'email3',
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
    expect(result.userID).toBe(userObj[0].userID);
    expect(result.userName).toBe(userObj[0].userName);
    expect(result.email).toBe(userObj[0].email);
    expect(result).toEqual(userObj[0]);
  });

  it('should create new user', async () => {
    const result = await controller.create({
      userName: 'test3',
      email: 'email3',
    });
    expect(result.userID).toBe(3);
    expect(result.userName).toBe('test3');
    expect(result.email).toBe('email3');
  });

  it('should update the user', async () => {
    const result = await controller.update('1', {
      userName: 'test3',
      email: 'email3',
    });
    expect(result.userID).toBe(1);
    expect(result.userName).toBe('test3');
    expect(result.email).toBe('email3');
  });

  it('should remove the user', async () => {
    const result = await controller.remove('1');
    expect(result.userID).toBe(1);
    expect(result.userName).toBe('test');
    expect(result.email).toBe('emai2');
  });
});

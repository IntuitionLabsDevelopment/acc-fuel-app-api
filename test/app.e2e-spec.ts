import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/users (POST) create new user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        userName: 'test',
        userEmail: 'test@test.com',
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.userName).toBe('test');
        expect(body.userEmail).toBe('test@test.com');
      });
  });

  it('/users (GET) get all users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then(({ body }) => {
        const users = jasmine.arrayContaining([
          jasmine.objectContaining({
            userName: 'test',
            userEmail: 'test@test.com',
          }),
        ]);
        expect(body).toEqual(users);
        expect(body).toBeInstanceOf(Array);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

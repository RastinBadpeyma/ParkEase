import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

import * as request from 'supertest';

let app: INestApplication;
let mod: TestingModule;

describe('parking-space (e2e)', () => {
  beforeAll(async () => {
    mod = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = mod.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return list of parking-space', async () => {
    return request(app.getHttpServer()).get('/parking-space').expect(200);
  });
});

import app from '../../src/app';
import { PrismaClient } from '@prisma/client';
import supertest from 'supertest';

const prisma = new PrismaClient();
const api = supertest(app);

beforeAll(async () => {
  await prisma.user.createMany({
    data: [
      {
        hashkey: 'test',
      },
    ],
  });
});

afterAll(async () => {
  await prisma.user.deleteMany({
    where: {
      hashkey: {
        contains: 'test',
      },
    },
  });
  await prisma.$disconnect();
});
describe('GET /users', () => {
  it('responds with JSON containing a list of all users', async () => {
    const response = await api
    .get('/api/auth/users')
    .expect('Content-Type', /application\/json/);

    expect(response.body).toContain([{ hashkey: 'test' }]);
  });
});

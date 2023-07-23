import request from 'supertest';

import app from '../src/app';

describe('Test app.ts', () => {
  test('Healthcheck works', async () => {
    const res = await request(app).get('/healthcheck');
    expect(res.text).toEqual('ok');
  });
});

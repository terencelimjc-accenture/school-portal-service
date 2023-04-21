import request from 'supertest';
import createServer from '../utils/server';

const app = createServer();

describe('Class API Endpoints', () => {
    it('should get a list of classes', async () => {
      const res = await request(app)
        .get('/api/classes');
      expect(res.statusCode).toEqual(200);
    });
    it('should add a new class', async () => {
      const res = await request(app)
        .post('/api/classes')
        .send({
          name: 'Class 2A',
          level: 'Primary 2',
          teacherEmail: 'johnwang@gmail.com'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toStrictEqual({
        name: 'Class 2A',
        level: 'Primary 2',
        teacherEmail: 'johnwang@gmail.com'
      });
    });
    it('should not add a new class', async () => {
      const res = await request(app)
        .post('/api/classes')
        .send({
          name: 'Class 3A',
          level: 'Primary 3',
          teacherEmail: 'johnwang@'
        });
      expect(res.statusCode).toEqual(400);
    });
  });
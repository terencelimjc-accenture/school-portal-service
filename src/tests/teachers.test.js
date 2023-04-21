import request from 'supertest';
import createServer from '../utils/server';

const app = createServer();

describe('Teacher API Endpoints', () => {
    it('should get a list of teachers', async () => {
      const res = await request(app)
        .get('/api/teachers');
      expect(res.statusCode).toEqual(200);
    });
    it('should add a new teacher', async () => {
      const res = await request(app)
        .post('/api/teachers')
        .send({
          name: 'Kakashi',
          subject: 'Physical Education',
          email: 'kakashi@gmail.com',
          contactNumber: '84273625'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toStrictEqual({
        name: 'Kakashi',
        subject: 'Physical Education',
        email: 'kakashi@gmail.com',
        contactNumber: '84273625'
      });
    });
    it('should not add a new teacher', async () => {
      const res = await request(app)
        .post('/api/teachers')
        .send({
          name: 'Itachi',
          subject: 'Physical Education',
          email: 'itachi@gmail.com',
          contactNumber: '8427362521'
        });
      expect(res.statusCode).toEqual(400);
    });
  });
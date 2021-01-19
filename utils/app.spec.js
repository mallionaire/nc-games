process.env.NODE_ENV = 'test';
const connection = require('../db/connection');
const request = require('supertest');
const app = require('../app');

afterAll(() => {
  return connection.destroy();
});
beforeEach(() => {
  return connection.seed.run();
});

describe('/api', () => {
  it('ERROR-status 404- returns 404 not found when given unknown path', () => {
    return request(app)
      .get('/xyz')
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('Sorry, invalid route');
      });
  });
  describe('/categories', () => {
    it('GET- status 200-  returns array of category objects on a key of categories', () => {
      return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({ body: { categories } }) => {
          expect(Array.isArray(categories)).toBe(true);
          expect(Object.keys(categories[0])).toEqual(['slug', 'description']);
        });
    });
    it('ERROR - status 405 - returns invalid method msg', () => {
      const invalidMethods = ['put', 'delete'];

      const requests = invalidMethods.map((method) => {
        return request(app)
          [method]('/api/categories')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('Sorry, method not allowed');
          });
      });
      return Promise.all(requests);
    });
  });
  describe('/users/:username', () => {
    it('GET - status 200 - responds with a user object', () => {
      return request(app)
        .get('/api/users/mallionaire')
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).toEqual({
            username: 'mallionaire',
            name: 'haz',
            avatar_url:
              'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
          });
        });
    });
    it('ERROR - status 404 - responds with user not found for invalid username', () => {
      return request(app).get("/api/users/invaliduser").expect(404).then(({body:{msg}}) => {
        expect(msg).toBe('Sorry, User not found.')
      })
    });
  });
  describe('/reviews/:review_id', () => {
    it('GET - status 200 - responds with a review object', () => {
      return request(app).get('/api/reviews/2').expect(200).then(({body:{review}})=>{
        expect(review.title).toBe('Jenga')
      })
    });
  });
});

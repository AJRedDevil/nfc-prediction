import supertest from 'supertest';
const expect = require('chai').expect;

const api = supertest('http://localhost:3000');

describe('FplStatic', () => {
  it('should return a 200 response', done => {
    api
      .get('/fplStatic')
      .set('Accept', 'Application/json')
      .expect(200, done);
  });

  it('should return the success status and app', done => {
    api
      .get('/fplStatic')
      .set('Accept', 'Application/json')
      .expect(200)
      .then(res => {
        const {success, message} = res.body;
        expect(success).to.be.true;
        expect(message).to.equal('fplStatic');
      })
      .then(done);
  });

  it('should return 20 teams info', done => {
    api
      .post('/fplStatic/teams')
      .set('Accept', 'Application/json')
      .expect(200)
      .then(res => {
        const {success, data} = res.body;
        expect(success).to.be.true;
        expect(data.length).to.equal(20);
        expect(data[0]).to.contains.all.keys('id', 'name', 'abbr');
      })
      .then(done);
  });
});

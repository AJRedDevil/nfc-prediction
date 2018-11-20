import supertest from 'supertest';
const expect = require('chai').expect;

const api = supertest('http://localhost:3000');
describe('Fixtures', () => {
  it('should return a 200 response', done => {
    api
      .get('/fixtures')
      .set('Accept', 'Application/json')
      .expect(200, done);
  });

  it('should return the success status and app', done => {
    api
      .get('/fixtures')
      .set('Accept', 'Application/json')
      .expect(200)
      .then(res => {
        const {success, message} = res.body;
        expect(success).to.be.true;
        expect(message).to.equal('fixtures');
      });
    done();
  });

  it('should return the 10 fixtures info', done => {
    api
      .post('/fixtures/1')
      .set('Accept', 'Application/json')
      .expect(200)
      .then(res => {
        const {success, data} = res.body;
        expect(success).to.be.true;
        expect(data.length).to.equal(10);
        expect(data[0].gameweek).to.equal(1);
      });
    done();
  });

  it('should return error message', done => {
    api
      .post('/fixtures/100')
      .set('Accept', 'Application/json')
      .expect(200)
      .then(res => {
        const {success, message} = res.body;
        expect(success).to.be.false;
        expect(message).to.equal('Fixture does not exist');
      });
    done();
  });
});

import supertest from 'supertest';
const expect = require('chai').expect;

const api = supertest('http://localhost:3000');

describe('Prediction', () => {
  it('should return a 200 response', done => {
    api
      .get('/prediction')
      .set('Accept', 'Application/json')
      .expect(200, done);
  });

  it('should return the success status and app', done => {
    api
      .get('/prediction')
      .set('Accept', 'Application/json')
      .expect(200)
      .then(res => {
        const {success, message} = res.body;
        expect(success).to.be.true;
        expect(message).to.equal('prediction');
      })
      .then(done);
  });

  it('should return with 100 responses for particular gameweek predictions', done => {
    api
      .get('/prediction/1')
      .set('Accept', 'Application/json')
      .expect(200)
      .then(res => {
        const {success, data} = res.body;
        expect(success).to.be.true;
        expect(data.length).to.equal(100);
      })
      .then(done);
  });

  it('should return error message on file upload', done => {
    api
      .post('/prediction/upload')
      .set('Accept', 'Application/json')
      .expect(200)
      .then(res => {
        const {success, message} = res.body;
        expect(success).to.be.false;
        expect(message).to.equal('Error in file upload');
      })
      .then(done);
  });

  it('should upload test file', done => {
    api
      .post('/prediction/upload')
      .attach('prediction', `${__dirname}/testFile.xlsx`)
      .set('Accept', 'Application/json')
      .expect(200)
      .then(res => {
        const {success, message} = res.body;
        expect(success).to.be.true;
        expect(message).to.equal('Successfully uploaded file');
      })
      .then(done);
  });
});

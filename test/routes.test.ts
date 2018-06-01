import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/routes', () => {
    it('should be json array', function(done) {
        this.timeout(0);
        return chai.request(app).get('/api/v1/routes')
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.have.header('content-type','application/json; charset=utf-8');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data).to.have.length(67663);
        });
    });
});
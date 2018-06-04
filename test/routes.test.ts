import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/routes', () => {

    // Retrieving all routes
    it('should be json array', function() {
        this.timeout(0);
        return chai.request(app).get('/api/v1/routes')
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.have.header('content-type','application/json; charset=utf-8');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data).to.have.length(67652);
        });
    });

    // With input/output iota or icao
    it('should contain origin and destination airport codes', function() {
        this.timeout(0);
        return chai.request(app).get('/api/v1/routes/best')
        .query({
            origin:'AER',
            destination: 'KZN'
        }).then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.have.header('content-type','application/json; charset=utf-8');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data).to.have.length(1);
        });
    });
});

    // input errors
    //empty source
    //empty dest
    //invalid source
    //invalid dest
    //same source same dest??
    //no route found
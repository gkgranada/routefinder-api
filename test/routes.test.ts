import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import chaiJsonEqual = require('chai-json-equal');

chai.use(chaiJsonEqual);

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/routes', () => {

    // Retrieving all routes
    it('should return all direct flights', function() {
        this.timeout(0);
        return chai.request(app).get('/api/v1/routes')
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.have.header('content-type','application/json; charset=utf-8');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data).to.have.length(67652);
        });
    });

    // Route tests
    let testParams = [
        ['DME', 'KZN'], // 1 leg
        ['AER', 'ASF'], // 2 legs
        ['AER', 'MRV'], // 3 legs
        ['AER', 'GYD'], // 4 legs (more than requirement, but routesearch function shouldn't care)
        ['ASF', 'HGH'] // 0 legs (path not found)
    ];



    let testResults = [
        // 1 leg
        [{
            airline: '2B',
            airlineid: 410,
            source: 'DME',
            sourceid: '4029',
            dest: 'KZN',
            destid: '2990',
            codeshare: '',
            stops: 0,
            equipment: 'CR2'
        }],
        // 2 legs
        [{
            airline: '2B',
            airlineid: 410,
            source: 'AER',
            sourceid: '2965',
            dest: 'KZN',
            destid: '2990',
            codeshare: '',
            stops: 0,
            equipment: 'CR2'
        },
        {
            airline: '2B',
            airlineid: 410,
            source: 'KZN',
            sourceid: '2990',
            dest: 'ASF',
            destid: '2966',
            codeshare: '',
            stops: 0,
            equipment: 'CR2'
        }],
        // 3 legs
        [{
            airline: '2B',
            airlineid: 410,
            source: 'AER',
            sourceid: '2965',
            dest: 'KZN',
            destid: '2990',
            codeshare: '',
            stops: 0,
            equipment: 'CR2'
        },
        {
            airline: '2B',
            airlineid: 410,
            source: 'KZN',
            sourceid: '2990',
            dest: 'ASF',
            destid: '2966',
            codeshare: '',
            stops: 0,
            equipment: 'CR2'
        },
        {
            airline: '2B',
            airlineid: 410,
            source: 'KZN',
            sourceid: '2966',
            dest: 'MRV',
            destid: '2962',
            codeshare: '',
            stops: 0,
            equipment: 'CR2'
        }],
        [],
        []
    ];

    testParams.forEach(function(t,i) {
        it('it should return [' + testResults[i] + ']  for ' + t[0] + ' .. ' + t[1], function(){
            this.timeout(0);
            return chai.request(app).get('/api/v1/routes/best')
            .query({
                origin: t[0],
                destination: t[1]
            }).then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type','application/json; charset=utf-8');
                expect(res.body.data).to.be.an('array');
                expect(res.body.data).to.have.length(testResults.length);
                (res.body.data).should.have.jsonEqual.members(testResults[i]);
            });
        });
    });

    // Empty origin
    it('should return ', function() {
        this.timeout(0);
        return chai.request(app).get('/api/v1/routes/best')
        .query({
            origin:'',
            destination: 'KZN'
        }).then(res => {
            expect(res.status).to.equal(500);
            expect(res.body.message).to.eql('Missing origin airport code');
        });
    });

    // Empty dest
    it('should return ', function() {
        this.timeout(0);
        return chai.request(app).get('/api/v1/routes/best')
        .query({
            origin:'AER',
            destination: 'KZN'
        }).then(res => {
            expect(res.status).to.equal(500);
            expect(res.body.message).to.eql('Missing destination airport code');
        });
    });

    // Origin airport not found
    it('should return ', function() {
        this.timeout(0);
        return chai.request(app).get('/api/v1/routes/best')
        .query({
            origin:'GGG',
            destination: 'KZN'
        }).then(res => {
            expect(res.status).to.equal(500);
            expect(res.body.message).to.eql('Airport not found: GGG');
        });
    });

    // Dest airport not found
    it('should return ', function() {
        this.timeout(0);
        return chai.request(app).get('/api/v1/routes/best')
        .query({
            origin:'AER',
            destination: 'GGG'
        }).then(res => {
            expect(res.status).to.equal(500);
            expect(res.body.message).to.eql('Airport not found: GGG');
        });
    });

    // Same origin and dest
    it('should return ', function() {
        this.timeout(0);
        return chai.request(app).get('/api/v1/routes/best')
        .query({
            origin:'AER',
            destination: 'AER'
        }).then(res => {
            expect(res.status).to.equal(500);
            expect(res.body.message).to.eql('Origin and Destination airports are the same');
        });
    });
});
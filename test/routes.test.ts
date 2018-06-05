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

    // Error cases
    it('should return error message for missing origin', function() {
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
    it('should return error message for missing destination', function() {
        this.timeout(0);
        return chai.request(app).get('/api/v1/routes/best')
        .query({
            origin:'AER',
            destination: ''
        }).then(res => {
            expect(res.status).to.equal(500);
            expect(res.body.message).to.eql('Missing destination airport code');
        });
    });

    // Origin airport not found
    it('should return airport not found for origin', function() {
        this.timeout(0);
        return chai.request(app).get('/api/v1/routes/best')
        .query({
            origin:'YYYYYY',
            destination: 'KZN'
        }).then(res => {
            expect(res.status).to.equal(500);
            expect(res.body.message).to.eql('Airport not found: YYYYYY');
        });
    });

    // Dest airport not found
    it('should return airport not found for destination', function() {
        this.timeout(0);
        return chai.request(app).get('/api/v1/routes/best')
        .query({
            origin:'AER',
            destination: 'TT'
        }).then(res => {
            expect(res.status).to.equal(500);
            expect(res.body.message).to.eql('Airport not found: TT');
        });
    });

    // Same origin and dest
    it('should return that origin and destination are the same', function() {
        this.timeout(0);
        return chai.request(app).get('/api/v1/routes/best')
        .query({
            origin:'AER',
            destination: 'AER'
        }).then(res => {
            expect(res.status).to.equal(500);
            expect(res.body.message).to.eql('Origin and destination airports are the same');
        });
    });

    it('it should return empty list for path of more than 4 legs', function(){
        this.timeout(0);
        return chai.request(app).get('/api/v1/routes/best')
        .query({
            origin: 'AER',
            destination: 'HTBU'
        }).then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.have.header('content-type','application/json; charset=utf-8');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data).to.have.length(0);
            expect(res.body.message).to.eql('Flight route contains more than 4 legs');
        });
    });

    it('it should return empty list for path not found', function(){
        this.timeout(0);
        return chai.request(app).get('/api/v1/routes/best')
        .query({
            origin: 'ASF',
            destination: 'XXX'
        }).then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.have.header('content-type','application/json; charset=utf-8');
            expect(res.body.data).to.be.an('array');
            expect(res.body.data).to.have.length(0);
            expect(res.body.message).to.eql('Flight route not found');
        });
    });

    // Route tests
    let testParams = [
        ['DME', 'KZN'], // 1 leg
        ['AER', 'MRV'], // 2 legs
        ['AER', 'ASF'], // 3 legs
        ['AER', 'CZX']  // 4 legs
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
            airline: 'QN',
            airlineid: 426,
            source: 'AER',
            sourceid: '2965',
            dest: 'EVN',
            destid: '3964',
            codeshare: '',
            stops: 0,
            equipment: '735'
        },
        {
            airline: 'SU',
            airlineid: 130,
            source: 'EVN',
            sourceid: '3964',
            dest: 'MRV',
            destid: '2962',
            codeshare: '',
            stops: 0,
            equipment: '319'
        }],
        // 3 legs
        [{
            airline: 'QN',
            airlineid: 426,
            source: 'AER',
            sourceid: '2965',
            dest: 'EVN',
            destid: '3964',
            codeshare: '',
            stops: 0,
            equipment: '735'
        },
        {
            airline: 'SU',
            airlineid: 130,
            source: 'EVN',
            sourceid: '3964',
            dest: 'MRV',
            destid: '2962',
            codeshare: '',
            stops: 0,
            equipment: '319'
        },
        {
            airline: '2B',
            airlineid: 410,
            source: 'MRV',
            sourceid: '2962',
            dest: 'ASF',
            destid: '2966',
            codeshare: '',
            stops: 0,
            equipment: 'CR2'
        }],
        // 4 legs
        [{
            airline: 'HY',
            airlineid: 5281,
            source: 'AER',
            sourceid: '2965',
            dest: 'TAS',
            destid: '2983',
            codeshare: '',
            stops: 0,
            equipment: '767'
        },
        {
            airline: 'CZ',
            airlineid: 1767,
            source: 'TAS',
            sourceid: '2983',
            dest: 'URC',
            destid: '3399',
            codeshare: '',
            stops: 0,
            equipment: '752'
        },
        {
            airline: 'CA',
            airlineid: 751,
            source: 'URC',
            sourceid: '3399',
            dest: 'TYN',
            destid: '3369',
            codeshare: 'Y',
            stops: 0,
            equipment: '738'
        },
        {
            airline: 'CZ',
            airlineid: 1767,
            source: 'TYN',
            sourceid: '3369',
            dest: 'CZX',
            destid: '4109',
            codeshare: 'Y',
            stops: 0,
            equipment: '737'
        }]
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
                expect(res.body.data).to.have.length(testResults[i].length);
                res.body.data.forEach(function(v, j) {
                    expect(v.source).to.be.eql(testResults[i][j].source);
                    expect(v.sourceid).to.be.eql(testResults[i][j].sourceid);
                    expect(v.dest).to.be.eql(testResults[i][j].dest);
                    expect(v.destid).to.be.eql(testResults[i][j].destid);
                });
            });
        });
    });
});

var request = require('supertest');
var db = require('../database-mongo/index.js');
var mocha = 

describe('Server Test', function () {

    describe('Connection Test', function () {
        it('Should have a response from the server ', function (done) {
            request('http://127.0.0.1:3000').get('/').expect(200, done)
        })
        it('should resived error from the server with wrong path ', function (done) {
            request('http://127.0.0.1:3000').get('/wrong').expect(404, done)
        })

    })
})

describe('POST', function () {

    it('should register users ', function (done) {
        request('http://127.0.0.1:3000').post('/signup').expect(200).send({
            name: 'dana',
            major: 'hhhhh',
             email: 'dana@gfgf.com',
            username: 'dd',
            password: '3333',
            description:'wow',
            phoneNumber: '072852',
        }).end(function (err, res) {
            done()

        })
    })
})

describe('POST', function () {

    it('users login', function (done) {
        request("http://127.0.0.1:3000")
          .post("/login")
          .expect(200)
          .send({
            username: "dana",
            password: "1232"
          })
          .end(function(err, res) {
            done();
          });
    })
})



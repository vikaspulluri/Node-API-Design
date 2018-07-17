var app = require('./server');
var request = require('supertest');
var chai = require('chai').expect;
require('colors');
// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE
// to run the test type mocha server/specs.js

describe('[LIONS]'.yellow, function(){

  it('should get all lions', function(done) {
    request(app)
      .get('/lions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        chai(resp.body).to.be.an('array');
        done();
      })
  });

  it('should create a lion', function(done){
    var lion = {
      name: 'simba',
      age: 10,
      pride: 'brave',
      gender: 'male'  
    };
    request(app)
    .post('/lions')
    .send(lion)
    .set('Accept', 'application/json')
    .expect('Content-Type',/json/)
    .expect(201)
    .end(function(err,res){
      console.log(res.body);
      chai(res.body).to.be.an('object');
      done();
    })
  });

  it('should delete a lion', function(done){
    var lion = {
      name: 'test lion',
      age: 10,
      pride: 'test lion',
      gender: 'male'  
    };
    request(app)
    .post('/lions')
    .send(lion)
    .set('Accept', 'application/json')
    .expect('Content-Type',/json/)
    .expect(201)
    .end(function(err,res){
      var lion = res.body;
      request(app)
      .delete('/lions/' + lion.id)
      .end(function(err,resp){
        chai(resp.body).to.be.eql(lion);
        done();
      })
    })
  });

  it('should update a lion', function(done){
    var lion = {
      name: 'test lion',
      age: 10,
      pride: 'test lion',
      gender: 'male'  
    };
    request(app)
    .post('/lions')
    .send(lion)
    .set('Accept', 'application/json')
    .expect('Content-Type',/json/)
    .expect(201)
    .end(function(err,res){
      var lion = res.body;
      request(app)
      .put('/lions/' + lion.id)
      .send({name:'updated lion'})
      .end(function(err,resp){
        chai(resp.body.name).to.equal('updated lion');
        done();
      })
    })
  });
});



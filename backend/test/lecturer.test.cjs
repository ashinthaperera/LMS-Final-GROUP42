const chai = require('chai');
const expect = chai.expect;

const should = chai.should();
const chaiHttp = require('chai-http');

const index = require('../index');

chai.use(chaiHttp);



describe('/Test lecturer collection', function() {
    it('Test default API welcome route', (done) => {
        chai.request(index)
        .get("/welcome")
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            console.log(res.body.message);

            //const actualValue = res.body.message;
            //expect(actualValue).to.be.equal("Welcome to the Learning Management System!");
            done();
        });
    });

    
    it('The check whether, is it or not!', (done) => {
        const id = "6597e27d079abab458f1e324";
        chai.request(index)
        .get(`/lecturer/viewlec/${id}`)
        .end((err, res) => {
            res.body.should.be.a('object');
            const lecturer= res.body;
            console.log(lecturer);
            done();
        })
    });

    it('Test the number of lecturers in the university', (done) => {
        chai.request(index)
        .get(`/lecturer`)
        .end((err, res) => {
            res.body.should.be.a('array');
            const numberOfLecturers= res.body.length;
            console.log("Number of lecturers: "+numberOfLecturers);
            done();
        })
    });

    it('should POST can be entered', (done) => {
        const lecturer = {
            firstName: "Mohammed",
            lastName: "Shafraz",
            email: "Shafraz87@gmail.com",
            password: "SurePwd123",
            contactNumber: "+94754218487",
            moduleName: "AI and Machine Learning"
        }

        chai.request(index)
        .post('/lecturer/addlec')
        .send(lecturer)
        .end((err, res) => { 
            res.should.have.status(201);
            done();
        });
    });


})
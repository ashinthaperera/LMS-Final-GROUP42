const chai = require('chai');
const expect = chai.expect;

const should = chai.should();
const chaiHttp = require('chai-http');

const index = require('../index');



chai.use(chaiHttp);



describe('/Test Student collection', function() {
    it('Test default API welcome route', (done) => {
        chai.request(index)
        .get("/welcome")
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            

            const actualValue = res.body.message;
            expect(actualValue).to.be.equal("Welcome to the Learning Management System!");
            done();
        });
    });

    it('Test the number of students in the university', (done) => {
        chai.request(index)
        .get(`/student`)
        .end((err, res) => {
            res.body.should.be.a('array');
            const numberOfStudents= res.body.length;
            console.log("Number of Students: "+numberOfStudents);
            done();
        })
    });

    it('should someone can be entered', (done) => {
        const student = {
            firstName: "Onel",
            lastName: "Ilangasekara",
            email: "Onel21@gmail.com",
            password: "SurePwd123",
            dob: "10/21/2001",
            contactNumber: "+94772317745",
            address: "Chilaw",
            degreeName: "BSc (Hons.) Software Engineering"
        }

        chai.request(index)
        .post('/student/addstud')
        .send(student)
        .end((err, res) => { 
            res.should.have.status(201);
            done();
        });
    });

    it('The check whether, is it or not!', (done) => {
        const id = "6598cf6e08cd8636f89bda60";
        chai.request(index)
        .get(`/student/viewstud/${id}`)
        .end((err, res) => {
            res.body.should.be.a('object');
            const student= res.body;
            console.log(student);
            done();
        })
    });


})
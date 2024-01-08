
const chai = require('chai');
const expect = chai.expect;

const should = chai.should();
const chaiHttp = require('chai-http');

const index = require('../index');
const modules = require('../models/moduleSchema');


chai.use(chaiHttp);

before(async () => {
    await modules.deleteMany();
});



// Test suite declaration
describe('/Test module collection', function() {
    // Test case declaration
    it('Test default API welcome route', (done) => {
        chai.request(index)
        .get("/welcome")
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            console.log(res.body.message);

            // const actualValue = res.body.message;
            // expect(actualValue).to.be.equal("Welcome to our Learning Management System!");
            done();
        });
    });


    it('The modules are nothing!', (done) => {
        chai.request(index)
        .get('/module')
        .end((err, res) => {
            res.body.should.be.a('array');
            const actualValue = res.body.length;
            expect(actualValue).to.equal(0);
            done();
        });
    });

    it('should POST can be entered', (done) => {
        const module = {
            moduleCode: "PUSL3120",
            moduleName: "Full-Stack Development",
            degreeName: "BSc(Hons.) Software Engineering",
            firstName: "Mark"
        }

        chai.request(index)
        .post('/module/addmod')
        .send(module)
        .end((err, res) => { 
            res.should.have.status(201);
            done();
        });
    });

});

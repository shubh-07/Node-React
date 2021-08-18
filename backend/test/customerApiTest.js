const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

chai.should();
chai.use(chaiHttp);

describe("Customers API", () => {
    it('It should get all the customers', (done) => {
        chai.request(server)
            .get('/api/customer/getCustomers')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it('it should POST a new customer ', (done) => {
        let customer = {
            name: 'test',
            email: 'test',
            contact: '9119119119',
            amount: '1500',
            years: '4'
        }
        chai.request(server)
            .post('/api/customer/saveCustomer')
            .send(customer)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('msg').eql('New Customer Added.');
                done();
            });
    });
});
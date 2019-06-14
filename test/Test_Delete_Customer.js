var chai      = require('chai'),
    chaiHttp  = require('chai-http'),
    assert    = chai.assert,
    expect    = chai.expect,
    dotenv    = require('dotenv').config({path: './.env'}),
    uriTest   = process.env.APP_URL + ':' + process.env.APP_PORT;

chai.use(chaiHttp);

/*
 * Test DELETE: /api/customers/:id
 */
var listData = [
  {
    it     : 'CASE: Customer not found',
    _id    : '5d02b7517012f3259cfe197f',
    send   : {},
    matched: {'errors': 'Customer not found'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: Customer delected successfully',
    send   : {},
    matched: {'customers.phone': 332411176}
  },
//-------------------------------------------------------------------------------
];

// First, create a customer
chai.request(uriTest)
        .post('/api/customers')
        .send({
            'customer': {
                'phone': 332411176
            }
        })
        .end((err, res) => {
            describe('DELETE /api/customers/:id -> Delete a customer', () => {
                for (let data of listData) {

                    it(data.it, (done) => {
                        chai.request(uriTest)
                            .delete('/api/customers/' + (data._id || res.body.customers._id) )
                            .send(data.send)
                            .end((err, res) => {
                                expect(err).to.be.null;
                                expect(res).to.have.status(200);
                                expect(res.body).to.nested.include(data.matched);

                                done();
                            });
                    });
                }
            });
        });
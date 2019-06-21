var chai      = require('chai'),
    chaiHttp  = require('chai-http'),
    assert    = chai.assert,
    expect    = chai.expect,
    dotenv    = require('dotenv').config({path: './.env'}),
    uriTest   = process.env.APP_URL + ':' + process.env.APP_PORT;

chai.use(chaiHttp);


/*
 * Test PUT: /api/customers/:id
 */

var listData = [
  {
    it     : 'CASE: Update customer failed because NOT FOUND',
    id     : 'CU4344783234',
    send   : {'customer': {'phone': ''}},
    matched: {'errors': 'Customer not found'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: Update customer failed because `phone` is number',
    send   : {'customer': {'phone': 'd111222'}},
    matched: {'errors': 'Customers validation failed: phone: Cast to Number failed for value \"d111222\" at path \"phone\"'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: 1.Update customer failed because `phone` is 9 number (exclude 0 in the first position)',
    send   : {'customer': {'phone': 12345678911}},
    matched: {'errors': 'Customers validation failed: phone: Path `phone` (12345678911) is more than maximum allowed value (999999999).'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: 2.Update customer failed because `phone` is 9 number (exclude 0 in the first position)',
    send   : {'customer': {'phone': 12345678}},
    matched: {'errors': 'Customers validation failed: phone: Path `phone` (12345678) is less than minimum allowed value (100000000).'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: Update customer faild because `phone` is unique',
    send   : {'customer': {'phone': '0312345421'}},
    matched: {'errors': 'Customers validation failed: phone: Error, expected `phone` to be unique. Value: `312345421`'}
  },
//-------------------------------------------------------------------------------
];

// First, Create some new customers
chai.request(uriTest)
        .post('/api/customers')
        .send({
            'customer': {
                'phone': 312345421
            }
        }).end()

chai.request(uriTest)
        .post('/api/customers')
        .send({
            'customer': {
                'phone': 124343453
            }
        })
        .end((err, res) => {
            describe('PUT /api/customers/:id -> Update a customer', () => {
                for (let data of listData) {

                    it(data.it, (done) => {
                        chai.request(uriTest)
                            .put('/api/customers/' + (data.id || res.body.customers.id) )
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
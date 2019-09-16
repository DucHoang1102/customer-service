var chai      = require('chai'),
	chaiHttp  = require('chai-http'),
	assert    = chai.assert,
	expect    = chai.expect,
	dotenv    = require('dotenv').config({path: './.env'}),
	uriTest   = process.env.APP_URL + ':' + process.env.APP_PORT;

chai.use(chaiHttp);


/*
 * Test POST: /api/customer
 */

var listData = [
  {
	it     : 'CASE: New customer failed because `phone` is required',
	send   : {'customer': {'phone': ''}},
	matched: {'errors': 'Customers validation failed: phone: Path `phone` is required.'}
  },
//-------------------------------------------------------------------------------
  {
	it     : 'CASE: New customer failed because `phone` is number',
	send   : {'customer': {'phone': 'd111222'}},
	matched: {'errors': 'Customers validation failed: phone: Cast to Number failed for value \"d111222\" at path \"phone\"'}
  },
//-------------------------------------------------------------------------------
  {
	it     : 'CASE: 1.New customer failed because `phone` is 9 number (exclude 0 in the first position)',
	send   : {'customer': {'phone': 12345678911}},
	matched: {'errors': 'Customers validation failed: phone: Path `phone` (12345678911) is more than maximum allowed value (999999999).'}
  },
//-------------------------------------------------------------------------------
  {
	it     : 'CASE: 2.New customer failed because `phone` is 9 number (exclude 0 in the first position)',
	send   : {'customer': {'phone': 12345678}},
	matched: {'errors': 'Customers validation failed: phone: Path `phone` (12345678) is less than minimum allowed value (100000000).'}
  },
//-------------------------------------------------------------------------------
  {
	it     : 'CASE: New customer successfully. Case: 0 in the first position --- type of number is String --- is trim()',
	send   : {'customer': {'phone': '  0972982082   '}},
	matched: {'customers.phone': 972982082}
  },
//-------------------------------------------------------------------------------
  {
	it     : 'CASE: New customer faild because `phone` is unique',
	send   : {'customer': {'phone': '972982082'}},
	matched: {'errors': 'Customers validation failed: phone: Error, expected `phone` to be unique. Value: `972982082`'}
  },
//-------------------------------------------------------------------------------
];

describe('POST /api/customers -> New a customer', () => {
	for (let data of listData) {

        it(data.it, (done) => {
            chai.request(uriTest)
                .post('/api/customers')
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
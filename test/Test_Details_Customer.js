var chai      = require('chai'),
    chaiHttp  = require('chai-http'),
    assert    = chai.assert,
    expect    = chai.expect,
    dotenv    = require('dotenv').config({path: './.env'}),
    uriTest   = process.env.APP_URL + ':' + process.env.APP_PORT;

chai.use(chaiHttp);

/*
 * Test GET: /api/customers/:id
 */
var listData = [
  {
    it     : 'CASE: Customer not found',
    _id    : '5d02bab8e8a10b04f820ecfb',
    send   : {},
    matched: {'errors': 'Customer not found'}
  },
//-------------------------------------------------------------------------------
  {
    it     : 'CASE: Details a customer',
    send   : {},
    matched: {
        'customers.phone'       : 144344529,
        'customers.name'        : 'Nguyễn Văn A',
        'customers.gender'      : 1,
        'customers.birthday'    : '1990-05-27T17:00:00.000Z',
        'customers.id_facebook' : 0,
        'customers.scores'      : 0,
        'customers.note'        : '',

        'customers.address.full'     : 'Đoàn Kết - Thanh Miện - Hải Dương',
        'customers.address.commune'  : 'Đoàn Kết',
        'customers.address.district' : 'Thanh Miện',
        'customers.address.province' : 'Hải Dương',
    }
  },
];

// First, create a customer
chai.request(uriTest)
        .post('/api/customers')
        .send({
            'customer': {
                'phone': 144344529,
                'name': 'Nguyễn Văn A',
                'address': {
                    'full': 'Đoàn Kết - Thanh Miện - Hải Dương',
                    'commune': 'Đoàn Kết',
                    'district': 'Thanh Miện',
                    'province': 'Hải Dương'
                },
                'gender': 1,
                'birthday': '1990-5-28'
            }
        })
        .end((err, res) => {
            describe('GET /api/customers/:id -> Details a customer', () => {
                for (let data of listData) {

                    it(data.it, (done) => {
                        chai.request(uriTest)
                            .get('/api/customers/' + (data._id || res.body.customers._id) )
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

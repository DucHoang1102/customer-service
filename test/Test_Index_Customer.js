var chai      = require('chai'),
    chaiHttp  = require('chai-http'),
    assert    = chai.assert,
    expect    = chai.expect,
    dotenv    = require('dotenv').config({path: './.env'}),
    uriTest   = process.env.APP_URL + ':' + process.env.APP_PORT;

chai.use(chaiHttp);

/*
 * Test GET: /api
 */
describe('GET /api: Test index customer', () => {
    it('Response a wecomel success', (done) => {
        chai.request(uriTest)
            .get('/api')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.deep.equal({
                    "status": "Customers Service Api",
                    "message": "Welcome"
                });

                done();
            });
    });
});
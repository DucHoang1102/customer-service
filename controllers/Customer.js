var mongoose    = require('mongoose'),
    Customer    = mongoose.model('Customers'),
    idGenerator = require('id-random-generator');

exports.index = function (req, res, next) {
    return res.json({
        status: 'Customers Service Api',
        message: 'Welcome'
    });
};

exports.view = function (req, res, next) {
    var limit  = String(req.body.limit)  || 20; // Why String()? Because case req.body.limit = 0 is Number
    var offset = String(req.body.offset) || 0;
    var query  = req.body.query          || {};
    var sort   = req.body.sort           || {createdAt: 'desc'};
    var select = req.body.select         || '';

    var results = Customer.find(query)
        .select(select)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort(sort)
        .exec();

    Promise.all([results]).then(results => {
        var customers = results[0]
        return res.json({customers: customers});

    }).catch( err => res.json({ errors: err.message }) );
};

exports.new = function (req, res, next) {
    var customer = new Customer(req.body.customer);

    // Random id
    customer.id = idGenerator.generate({prefix: 'CU', min: 1000000000, max: 9999999999});

    return customer.save().then(results => {
        return res.json({
            customers: results
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.details = function (req, res, next) {
    Customer.findOne( {id: req.params.id} ).exec().then(results => {
        if (!results) throw new Error('Customer not found');

        return res.json({
            customers: results
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.update = function (req, res, next) {
    Customer.findOne( {id: req.params.id} ).exec().then(customer => {
        if (!customer) throw new Error('Customer not found');

        if (typeof req.body.customer.name !== 'undefined') {
            customer.name = req.body.customer.name;
        }

        if (typeof req.body.customer.address !== 'undefined') {
            customer.address = req.body.customer.address;
        }

        if (typeof req.body.customer.phone !== 'undefined') {
            customer.phone = req.body.customer.phone;
        }

        if (typeof req.body.customer.gender !== 'undefined') {
            customer.gender = req.body.customer.gender;
        }

        if (typeof req.body.customer.birthday !== 'undefined') {
            customer.birthday = req.body.customer.birthday;
        }

        if (typeof req.body.customer.id_facebook !== 'undefined') {
            customer.id_facebook = req.body.customer.id_facebook;
        }

        if (typeof req.body.customer.scores !== 'undefined') {
            customer.scores = req.body.customer.scores;
        }

        if (typeof req.body.customer.note !== 'undefined') {
            customer.note = req.body.customer.note;
        }

        customer.save().then(customer => {
            return res.json({ customer: customer });
            
        }).catch( err => res.json({ errors: err.message }) );

    }).catch( err => res.json({ errors: err.message }) );
};

exports.delete = function (req, res, next) {
    Customer.findOneAndRemove( {id: req.params.id} ).exec().then(results => {
        if (!results) throw new Error('Customer not found');

        return res.json({
            customers: results
        });
        
    }).catch( err => res.json({ errors: err.message }) );
};

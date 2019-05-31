var mongoose = require('mongoose'),
    Customer = mongoose.model('Customers');

exports.index = function (req, res, next) {
    return res.json({
        status: 'Customers Service Api',
        message: 'Welcome'
    });
};

exports.view = function (req, res, next) {
    var limit = String(req.body.limit) || 20; // Why String()? Because case req.body.limit = 0 is Number
    var offset = String(req.body.offset) || 0;
    var query = req.body.query || {};
    var sort = req.body.sort || {createdAt: 'desc'};
    var select = req.body.select || '';

    var results = Customer.find(query)
        .select(select)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort(sort)
        .exec();

    Promise.all([results]).then(results => {
        var customers = results[0]
        return res.json({customers: customers});
    }).catch((err) => {
        return res.json({
            errors: err
        });
    });
};

exports.new = function (req, res, next) {
    var customer = new Customer(req.body.customer);

    return customer.save().then(results => {
        return res.json({
            customers: results
        });
    }).catch((err) => {
        return res.json({
            errors: err
        });
    });
};

exports.details = function (req, res, next) {
    Customer.findById(req.params.id).exec().then(results => {
        return res.json({
            customers: results
        });
    }).catch(err => {
        return res.json({
            errors: err
        });
    });
};

exports.update = function (req, res, next) {
    var customerBeforeUpdate = Customer.findByIdAndUpdate(req.params.id, req.body.customer).exec();
    var customerAfterUpdate = Customer.findById(req.params.id).exec();

    Promise.all([customerBeforeUpdate, customerAfterUpdate]).then(results => {
        return res.json({
            customers: results
        });
    }).catch(err => {
        return res.json({
            errors: err
        });
    });
};

exports.delete = function (req, res, next) {
    Customer.findByIdAndRemove(req.params.id).exec().then(results => {
        return res.json({
            customers: results
        });
    }).catch(err => {
        return res.json({
            errors: err
        });
    });
};

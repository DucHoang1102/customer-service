var routerIndex = require('express').Router();
var routerGroup = require('express').Router();
var customerController = require('../controllers/Customer');

routerGroup.get('/', customerController.index);

routerGroup.get('/customers', customerController.view);

routerGroup.post('/customers', customerController.new);

routerGroup.get('/customers/:id', customerController.details);

routerGroup.put('/customers/:id', customerController.update);

routerGroup.delete('/customers/:id', customerController.delete);

routerIndex.use('/api', routerGroup);

module.exports = routerIndex;
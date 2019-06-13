var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var CustomersSchema = new mongoose.Schema({
    name: {type: String, default: ""},
    address: {
        full: {type: String, default: ""},
        commune: {type: String, default: ""},
        district: {type: String, default: ""},
        province: {type: String, default: ""}
    },
    phone: {type: String, required: true, unique: true},
    gender: {type: Number, min: 1, max: 3, default: 3},
    birthday: {type: Date, default: null},
    id_facebook: {type: String, default: ""},
    scores: {type: Number, min: 0, default: 0},
    note: {type: String, default: ""},
}, {timestamps: true});

CustomersSchema.plugin(uniqueValidator, 'is already exist.');

module.exports = mongoose.model('Customers', CustomersSchema);


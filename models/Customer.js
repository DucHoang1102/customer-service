var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var CustomersSchema = new mongoose.Schema( {
    id         : { type: String, required: true, unique: true, trim: true, validate: function(v) {return /CU[0-9]{10}/g.test(v);} },
    phone      : { type: Number, required: true, unique: true, trim: true, min: 100000000, max: 999999999 },
    name       : { type: String, default: "" },
    address    : {
        full     : { type: String, default: "" },
        commune  : { type: String, default: "" },
        district : { type: String, default: "" },
        province : { type: String, default: "" }
    },
    gender     : {type: Number, min: 1, max: 3, default: 3, trim: true},
    birthday   : {type: Date, default: null, trim: true},
    id_facebook: {type: Number, default: 0, trim: true},
    scores     : {type: Number, min: 0, default: 0, trim: true},
    note       : {type: String, default: ""}

}, {timestamps: true} );   

CustomersSchema.plugin(uniqueValidator, 'is already exist.');

module.exports = mongoose.model('Customers', CustomersSchema);


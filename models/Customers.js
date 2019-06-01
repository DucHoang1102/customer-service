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
    phone: {type: String, unique: true, index: true},
    gender: {type: Number,default: 3},
    birthday: {type: Date, default: null},
    id_facebook: {type: String, default: ""},
    scores: {type: Number, default: 0},
    note: {type: String, default: ""},
}, {timestamps: true});

CustomersSchema.plugin(uniqueValidator, 'is already exist.');

CustomersSchema.methods.getCustomer = function() {
    return {
        _id: this._id,
        name: this.name,
        address: {
            full: this.address.full,
            commune: this.address.commune,
            district: this.address.district,
            province: this.address.province
        },
        phone: this.phone,
        gender: this.gender,
        year_of_birth: this.year_of_birth,
        id_facebook: this.id_facebook,
        scores: this.scores,
        note: this.note
    }
}

mongoose.model('Customers', CustomersSchema);
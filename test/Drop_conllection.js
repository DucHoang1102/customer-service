var mongoose  = require('mongoose'),
    dotenv    = require('dotenv').config({path: './.env'});

setTimeout(function(){
    mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
    mongoose.connection.dropCollection('customers', function(err, results){
        if (results) console.log('Drop collection success');
        mongoose.connection.close();
    });
},1000);

'use strict';

var request = require('request');
var bcrypt = require('bcrypt-nodejs');

var password = "letmein";

bcrypt.hash(password, null, null, function(error, hash) {
    if (error) throw err;

    request.post (
        {
            uri:"http://127.0.0.1:7474/awmgs/plugins/variantdatabase/user/add",
            json: {
                fullName : "Matthew Lyon",
                email : "matt.lyon@wales.nhs.uk",
                password : hash,
                admin : true
            }
        },
        function(error, result)
        {
            if (error) throw err;
            console.log(JSON.stringify(result));
        }
    );

});

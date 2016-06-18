'use strict';

module.exports = function(app, auth, request){
    app.get('/api/variantdatabase/dataset/info', auth, function(req, res) {
        request.get (
            {
                uri:"http://127.0.0.1:7474/awmgs/plugins/variantdatabase/dataset/info",
                json: req.body
            },
            function(error, result)
            {
                if (error) throw err;
                if (result.statusCode != 200) {
                    res.status(result.statusCode).send(result.body);
                } else {
                    res.send(result.body);
                }
            }
        )
    });
};
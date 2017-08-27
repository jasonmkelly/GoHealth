var express = require('express');
var patientRouter = express.Router();

var router = function () {
    patientRouter.route('validateInsurace')
        .post(function (req, res) {
            console.log(req.body);
        });
    
    return patientRouter;
};

module.exports = router;

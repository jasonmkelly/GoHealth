var http = require('http');
var https = require('https');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var curl = require('curlrequest');

var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(req, res);
    }
})

function displayForm(res) {
    fs.readFile('./src/views/form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        console.log(fields["ins_carrier"]);

        if (fields["patient_f_name"] == "" || fields["patient_l_name"] == "" || fields["patient_dob"] == "" || fields["ins_carrier"] == "-1" || fields["ins_id"] == "") {
            console.log('Missing Required Fields');
        } else if (fields["ins_carrier"] == "self") {

            console.log('Redirecting to url');

            res.writeHead(301, {
                Location: 'https://www.gohealthuc.com/about/'
            });
            res.end();
        } else {
            console.log('validating insurance');
            validatePatientInsurance(fields);
        }

        /*res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields,
            files: files
        }));*/
    });
}

function validatePatientInsurance(fields) {
    var options = {
        host: 'apistage.gohealthuc.com',
        port: 1981,
        path: '/v1/eligibility_demo?',
        headers: 'authtoken:ghjason123'
        //data: {'"member":{"first_name":"' + fields["patient_f_name"] + '","last_name":"' + fields["patient_l_name"] = '","id":"' + fields["ins_id"] + '","birth_date":"' + fields["patient_dob"] + '"}," trading_partner_id":"' + fields["ins_carrier"] + '"'}
    };

    var req = https.request(options, function (res) {
        var msg = '';

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            msg += chunk;
        });
        res.on('end', function () {
            console.log(JSON.parse(msg));
        });
        res.on('error', function () {
            console.log('error');
        });

        parseInsuranceEligibilityResponse(msg);
    })
}

function parseInsuranceEligibilityResponse(resp) {

}


server.listen(8080);
console.log("server listening on 8080");

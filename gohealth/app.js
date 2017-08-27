var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();

var port = 5000;
var patientRouter = require('./src/routes/patientRoutes');
//var patientController = require('./src/controllers/patientController')(null);


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());


//app.use(express.static('src/views'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/patient', patientRouter);

app.get('/', function(req, res){
    res.render('index');
});



app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

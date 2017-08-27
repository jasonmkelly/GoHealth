var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicityArray: false});

var insuranceeligibilityService = function() {
    var validateInsurace = function() {
        var options = {
            host: '',
            path: ''
        };
    };
    
    var callback = function(response){
        var str = '';
        
        response.on('data', function(chunk){
           str += chunk; 
        });
        
        response.on(end, function() {
            
        });
    };
    
    return {
        validateInsurace: validateInsurace
    };
};

module.exports = insuranceeligibilityService;
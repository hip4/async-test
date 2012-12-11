var async = require("async"),
	director = require("director"),
	http = require("http-server");

var l_port = 8008;


var routing = {
    '/test': {
            '/(.+)': {
                    get: test
            }
    }
};

function test(filename){
	res.end("hell0");
}


var router = new director.http.Router(routing);

//
// setup a server and when there is a request, dispatch the
// route that was requested in the request object.
//
var server = http.createServer(function(req, res) {
	if(debug)
		console.log("new request for url " + req.url);
	router.dispatch(req, res, function(err) {
		if (err) {
			res.statusCode = 404;
			res.end();
		}
	});
});


server.listen(l_port);
var async = require("async"),
	director = require("director"),
	http = require("http")

var l_port = 8080;
var debug = true;

var routing = {
    '/test': {
            '/(.+)': {
                    get: test
            }
    }
};

function test(query){
	this.res.writeHead(200,{"Content-Type":"text/html"});
	this.res.end("hell0 " + query);
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
var async = require("async"),
	director = require("director"),
	http = require("http")

var l_port = 8080;
var debug = true;

var routing = {
    '/waterfall': {
            '/(.+)': {
                    get: waterfall
            }
    }
};

function waterfall(query){
	this.res.writeHead(200,{"Content-Type":"text/html"});
	var that = this;
	var callback = function(content){
		that.res.write(content);
	};

	async.waterfall([
		waterfall3(callback),
		waterfall2(callback),
		waterfall1(callback)
	],function(err){
		if(err){
			that.res.writeHead(500,{"Content-Type":"text/plain"});
			that.res.end("Internal Server error");			
		}
		that.res.writeHead(200,{"Content-Type":"text/html"});
		that.res.end();
	});

}

function waterfall1(cb){
	cb("waterfall1<br />");
}

function waterfall2(cb){
	cb("waterfall2<br />");
}

function waterfall3(cb){
	cb("waterfall3<br />");
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
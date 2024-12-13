// const basicAuth = require('express-basic-auth')

module.exports = [
	{
		id: "auth-test",
		url: "/authtest",
		method: "GET",
		variants: [

			{
				id: "log-something",
				type: "middleware",
				options: {
					middleware: (req, res) => {
						// console.log("request: ", req);
						// console.log("headers: ", req.rawHeaders);

						console.log("Authorization: ", req.headers('Authorization'));

						let strArray = req.header('Authorization').split(' ');
						console.log("strArray: ", strArray);

						let decodedAuthString = atob(strArray[1]);
						console.log("decodedAuthString: ", decodedAuthString);

						let authArray = decodedAuthString.spit(':');
						console.log("User: ", authArray[0]);
						console.log("Password: ", authArray[1]);

						res.status(200);
						res.send("fnord");
					}
				}
			}
		]
	}

]
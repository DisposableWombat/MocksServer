// const basicAuth = require('express-basic-auth')

module.exports = [
	{
		id: "log-something",
		url: "/authtest01",
		method: "GET",
		variants: [
			{
				id: "log",
				type: "middleware",
				options: {
					middleware: (req, res) => {
						// console.log("request: ", req);
						// console.log("headers: ", req.rawHeaders);

						console.log("Authorization: ", req.header('Authorization'));

						let strArray = req.header('Authorization').split(' ');
						console.log("strArray: ", strArray);

						let decodedAuthString = atob(strArray[1]);
						console.log("decodedAuthString: ", decodedAuthString);

						let authArray = decodedAuthString.split(':');
						console.log("User: ", authArray[0]);
						console.log("Password: ", authArray[1]);

						res.status(200);
						res.send("fnord");
					}
				}
			}
		]
	},
	{
		id: "verify-login",
		url: "/authtest02",
		method: "GET",
		variants: [
			{
				id: "verify",
				type: "middleware",
				options: {
					middleware: (req, res) => {
						let strArray = req.header('Authorization').split(' ');
						let decodedAuthString = atob(strArray[1]);
						let authArray = decodedAuthString.split(':');
						// console.log("User: ", authArray[0]);
						// console.log("Password: ", authArray[1]);

						if (authArray[0] == "andyroo" && authArray[1] == "gooberpucky") {
							res.status(200);
							res.send("happy, happy");
						} else {
							res.status(401);
							res.send("no soup for you");
						}
					}
				}
			}
		]
	}

]
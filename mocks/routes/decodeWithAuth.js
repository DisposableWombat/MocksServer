const fileRoot = "/home/wombat/development/MocksServer/"

module.exports = [
	{
		id: "vin-decode-oem-with-auth",
		url: "/UNITS/GetVINInfoUser/*/:dealerid",
		method: "GET",
		variants: [
			{
				id: "decode",
				type: "middleware",
				options: {
					middleware: (req, res) => {
						let strArray = req.header('Authorization').split(' ');
						let decodedAuthString = atob(strArray[1]);
						let authArray = decodedAuthString.split(':');
						// console.log("User: ", authArray[0]);
						// console.log("Password: ", authArray[1]);
						if (authArray[0] == "andyroo" && authArray[1] == "gooberpucky") {
							const cmf = req.params.dealerid;
							res.status(200);
							if (cmf == 77770666) {
								res.sendFile(fileRoot + fixtures/vin_response_OE.json)
							} else {
								res.sendFile(fileRoot + fixtures/vin_response_nonOE.json)
							}
					} else {
						res.status(200);
						res.send("no soup for you");
					}
				}
				
			}
		]

	}
]
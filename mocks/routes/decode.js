module.exports = [
	{
		id: "vin-decode-oem",
		url: "/UNITS/GetVinInfoUser/*/77770666",
		method: "GET",
		variants: [
			{
				id: "decode",
				type: "file",
				options: {
					status: 200,
					path: "./fixtures/vin_response_OE.json"
				}
			}
		]
	},
	{
		id: "vin-decode-non-oem",
		url: "/UNITS/GetVinInfoUser/*/77770555",
		method: "GET",
		variants: [
			{
				id: "decode",
				type: "file",
				options: {
					status: 200,
					path: "./fixtures/vin_response_nonOE.json"
				}
			}
		]
	}




]
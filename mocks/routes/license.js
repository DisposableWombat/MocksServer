const dealers = require("../../fixtures/dealerlicenses");
const Core = require("@mocks-server/core");

module.exports = [
  {
    id: "get-license", // route id
    url: "/REST/DMS/CMFLicense/:dealerid/:licensekey",
    method: "GET",
    variants: [
      {
        id: "success", // variant id
        type: "text", // variant handler id
        options: {
          status: 200,
          body: "12/31/2024"
        },
      },
      {
        id: "fail", // variant id
        type: "text", // variant handler id
        options: {
          status: 200,
          body: "12/30/1899"
        },
      },
      {
        id: "dukeOfMadnessMotors",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const cmf = req.params.dealerid;
            if (cmf == "77770666") {
              res.status(200);
              res.send("12/31/2024");
            } else {
              res.status(200);
              res.send("12/30/1899");
            }
          }
        },
      },
      {
        id: "fileLookup",
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const cmf = req.params.dealerid
            const key = req.params.licensekey
            var licensed = false
            dealers.forEach( function (dealer) {
              if (dealer.cmf == cmf) {
                dealer.licenses.forEach( function (license) {
                  if (license.key == key) {
                    licensed = license.enabled
                  }
                });
              }
            });

            if (licensed) {
              res.status(200);
              res.send("12/31/2024");
            } else {
              res.status(200);
              res.send("12/30/1899");
            }

          }
        }
      }

    ],
  },
];

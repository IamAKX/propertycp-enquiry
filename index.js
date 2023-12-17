const express = require("express");
const hbs = require("hbs");
const app = express();
const https = require("https");

hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/:id", (req, res) => {
  const objectId = parseInt(req.params.id);

  https
    .get("https://13.48.104.206:7240/api/properties/18", (details) => {
      console.log("statusCode:", details.statusCode);
      console.log("headers:", details.headers);
      details.on("data", (d) => {
        process.stdout.write(d);
	      res.json(d.json());
	      //   res.render("property", { data: d["data"] });
      });
    })
    .on("error", (e) => {
      console.error(e);
    });
});

app.listen(3000);

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
      let data = "";
      details.on("data", (chunk) => {
        data = data + chunk.toString();
        //   res.render("property", { data: d["data"] });
      });
      details.on("end", () => {
        const body = JSON.parse(data);
        console.log(body);
        res.render("property", { data: body["data"] });
      });
    })
    .on("error", (e) => {
      console.error(e);
    });
});

app.listen(3000);

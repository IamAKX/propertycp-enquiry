const express = require("express");
const hbs = require("hbs");
const app = express();
const axios = require("axios");

hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/:id", (req, res) => {
  const objectId = parseInt(req.params.id);
  axios
    .get("https://13.48.104.206:7240/api/properties/18")

    .then((detail) => res.render("property", { data: detail["data"] }))
    .catch((err) => console.log(err));
});

app.listen(3000);

const express = require("express");
const hbs = require("hbs");
const app = express();
const https = require("https");
const { url } = require("inspector");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

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
    .get("https://13.48.104.206:7242/api/properties/" + objectId, (details) => {
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

app.post("/enquiry", (req, res) => {
  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "propsotec@gmail.com",
      pass: "omzwzybeimeacnfd",
    },
  });
  console.log(req.body);
  mailTransporter.sendMail(req.body, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err, status: "failed" });
    } else {
      console.log("Mail sent");
      res.status(200).json({ message: "Mail sent" });
    }
  });
});

app.listen(3000);
console.log("app started at 3000");

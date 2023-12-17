const express = require("express");
const hbs = require("hbs");
const app = express();
const axios = require("axios");

hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
app.set("view engine", "hbs");
app.set("views", "./views");

let sampleRes = {
  success: true,
  message: "Property retrieved successfully",
  data: {
    id: 18,
    title: "test",
    subTitle: "abc",
    price: "1.2Cr",
    numberOfRooms: null,
    bhk: "4BHK",
    location: null,
    city: "Bangalore",
    mainImage:
      "https://firebasestorage.googleapis.com/v0/b/propertycp-mobile.appspot.com/o/property%2FImage%2Fistockphoto-949087482-1024x1024.jpg?alt=media&token=5391a655-4158-41db-8f83-a23f4db23867",
    images: [
      {
        id: "3cb74085-164f-4e32-66e3-08dbd722ceea",
        mediaType: "Image",
        url: "https://firebasestorage.googleapis.com/v0/b/propertycp-mobile.appspot.com/o/property%2FImage%2Fistockphoto-949087482-1024x1024.jpg?alt=media&token=5391a655-4158-41db-8f83-a23f4db23867",
        thumbnail: null,
      },
      {
        id: "ce587d53-2ca7-439e-66e4-08dbd722ceea",
        mediaType: "Image",
        url: "https://firebasestorage.googleapis.com/v0/b/propertycp-mobile.appspot.com/o/property%2FImage%2Fistockphoto-1146070421-1024x1024.jpg?alt=media&token=52589a08-b425-4e82-95b5-9f8fcf3d1e82",
        thumbnail: null,
      },
      {
        id: "6ea55d36-1749-4401-66e5-08dbd722ceea",
        mediaType: "Image",
        url: "https://firebasestorage.googleapis.com/v0/b/propertycp-mobile.appspot.com/o/property%2FImage%2Fistockphoto-1165384568-1024x1024.jpg?alt=media&token=72935713-b578-4e25-bb93-c7471633047e",
        thumbnail: null,
      },
      {
        id: "cbfc7061-3b00-47ea-66e6-08dbd722ceea",
        mediaType: "Video",
        url: "https://firebasestorage.googleapis.com/v0/b/propertycp-mobile.appspot.com/o/property%2FVideo%2Fsample-5s.mp4?alt=media&token=f3c72ebb-894e-4789-bed7-15ec18ee8e11",
        thumbnail:
          "https://firebasestorage.googleapis.com/v0/b/propertycp-mobile.appspot.com/o/property%2Fthumbnail%2Fproperty%252FVideo%252Fsample-5s.jpg?alt=media&token=ee1fa3c4-e6aa-466a-bde3-3ceba7bc81c5",
      },
    ],
    type: "Flats",
    area: "1200",
    areaUnit: "Sqft",
    description: "test",
    createdDate: "2023-11-11T23:40:13.9857568+05:30",
    updatedDate: "2023-11-11T23:40:13.9857631+05:30",
  },
};

app.get("/:id", (req, res) => {
  const objectId = parseInt(req.params.id);
  axios
    .get("https://13.48.104.206:7240/api/properties/18")

    .then((detail) => res.render("property", { data: detail["data"] }))
    .catch((err) => console.log(err));
});

app.listen(3000);

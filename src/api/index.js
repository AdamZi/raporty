const express = require("express");
const path = require("path");
const router = express.Router();
const { client } = require("./../db");

router.post("/ocr", async (req, res) => {
  const imageString = req.body.content.slice(23, req.body.length);
  console.log(imageString.slice(0, 50));
  const photo = {
    image: {
      content: Buffer.from(imageString, "base64"),
    },
  };

  //console.log(body.content.slice(0, 24));
  const vision = require("@google-cloud/vision");
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.documentTextDetection(photo);
  console.log(result);
  const ocr = result.textAnnotations
    .map(element => element.description)
    .slice(1)
    .join(" ");
  const regex1 = /(?<= # )\d{1,3}/m;
  const regex2 =
    /(\d{1,4},\d{2}(?=PLN))|(\d{1,4},\d{2}(?= Anul))|((?<=sprzedaży )\d{1,4},\d{2})/m;
  const regex3 = /(?<=Logowanie . )\d+\.\d+\.\d+/m;
  let busNumber = ocr.match(regex1);
  busNumber = busNumber ? busNumber.find(el => el) : "not recognized";
  let amount = ocr.match(regex2);
  amount = amount ? amount.find(el => el) : "not recognized";
  let date = ocr.match(regex3);

  if (date) {
    date = date.find(el => el);
    date = "20" + date.split(".").reverse().join("-");
  } else date = "note recognized";

  const report = { busNumber, amount, date };

  //console.log(ocr, report);
  res.send({ status: ocr });
});

router.post("/try", async (req, res) => {
  const fileName = path.resolve("public", `rap${req.body.number}.jpg`);
  const vision = require("@google-cloud/vision");
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.documentTextDetection(fileName);
  const ocr = result.textAnnotations
    .map(element => element.description)
    .slice(1)
    .join(" ");
  const regex1 = /(?<= # )\d{1,3}/m;
  const regex2 =
    /(\d{1,4},\d{2}(?=PLN))|(\d{1,4},\d{2}(?= Anul))|((?<=sprzedaży )\d{1,4},\d{2})/m;
  const regex3 = /(?<=Logowanie . )\d+\.\d+\.\d+/m;
  let busNumber = ocr.match(regex1);
  busNumber = busNumber ? busNumber.find(el => el) : "not recognized";
  let amount = ocr.match(regex2);
  amount = amount ? amount.find(el => el) : "not recognized";
  let date = ocr.match(regex3);

  if (date) {
    date = date.find(el => el);
    date = "20" + date.split(".").reverse().join("-");
  } else date = "note recognized";

  const report = { busNumber, amount, date };

  console.log(ocr);
  res.send({ status: ocr });
});
module.exports = router;

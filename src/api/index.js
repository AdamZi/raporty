const express = require("express");
const path = require("path");
const router = express.Router();
const { client } = require("./../db");

router.post("/ocr", (req, res) => {
  console.log(req.body);
  res.send("ok");
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

  console.log(ocr, report);
  res.send(report);
});
module.exports = router;

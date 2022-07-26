const express = require("express");
const router = express.Router();

router.post("/ocr", (req, res) => {
  console.log(req.body);
  res.send("ok");
});

router.post("/try", async (req, res) => {
  const fileName = __dirname + `./../../public/rap${req.body.number}.jpg`;
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
  busNumber = busNumber ? busNumber.find(el => el != null) : "not recognized";
  let amount = ocr.match(regex2);
  amount = amount ? amount.find(el => el != null) : "not recognized";
  let date = ocr.match(regex3);
  date = date ? date.find(el => el != null) : "not recognized";

  const report = {
    busNumber: busNumber,
    amount: amount,
    date: date,
  };

  console.log(ocr, report);
  res.send(report);
});
module.exports = router;

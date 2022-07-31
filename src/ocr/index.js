const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();

const recognizeReport = async imageString => {
  imageString = imageString.slice(23, imageString.length);
  const photo = {
    image: {
      content: Buffer.from(imageString, "base64"),
    },
  };
  const [result] = await client.documentTextDetection(photo);
  //console.log(result);
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
  } else date = "not recognized";
  console.log(ocr);
  const report = { date, amount, busNumber };
  return report;
};

module.exports = { recognizeReport };

const express = require("express");
const path = require("path");
const router = express.Router();
const { client } = require("./../db");
const { recognizeReport } = require("./../ocr");

router.post("/ocr", async (req, res) => {
  report = await recognizeReport(req.body.content);
  res.send(report);
});

router.post("/try", async (req, res) => {
  res.send({ status: "ok" });
});
module.exports = router;

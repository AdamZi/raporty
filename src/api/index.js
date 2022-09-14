const express = require("express");
const path = require("path");
const router = express.Router();
const { addReport, getAllReports, getSum } = require("./../db");
const { recognizeReport } = require("./../ocr");

router.post("/ocr", async (req, res) => {
  report = await recognizeReport(req.body.content);
  res.send(report);
});

router.post("/add", async (req, res) => {
  await addReport(req.body);
  res.send({ status: "ok" });
});

router.post("/get-sum", async (req, res) => {
  const { fromDate, toDate } = req.body;
  const sum = await getSum(fromDate, toDate);
  res.send(sum);
});

router.get("/get-all", async (req, res) => {
  const reports = await getAllReports();
  res.send(reports);
});

module.exports = router;

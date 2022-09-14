const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const client = new MongoClient(process.env.CONNECTIONSTRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client
  .connect()
  .then(() => console.log("connected to mongodb.."))
  .catch(err => console.error("could not connect to mongodb", err));

const addReport = async report => {
  const response = await client
    .db("reports")
    .collection("reports")
    .insertOne({
      date: new Date(report.date),
      amount: Number(report.amount),
      busNumber: report.busNumber,
    });
  console.log(response);
};

const getAllReports = async () => {
  return client.db("reports").collection("reports").find({}).toArray();
};

const getSum = async (fromDate, toDate) => {
  const pipeline = [
    {
      $match: {
        date: {
          $gte: new Date(fromDate),
          $lte: new Date(toDate),
        },
      },
    },
    {
      $group: {
        _id: null,
        sum: {
          $sum: "$amount",
        },
      },
    },
  ];
  return client
    .db("reports")
    .collection("reports")
    .aggregate(pipeline)
    .toArray();
};

module.exports = { client, addReport, getAllReports, getSum };

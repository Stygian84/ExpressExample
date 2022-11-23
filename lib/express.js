//const write = require("./lib/PLC");
const read = require("./lib/PLC");
const express = require("express");
const app = express();
const port = 3001;
const axios = require("axios");
const ads = require("./lib/ads-client.js");
const bp = require("body-parser");
const path = require("path");
const Piscina = require("piscina");
const Check = require("./lib/PLC");

// Initialise ADS Client
const client = new ads.Client({
  // localAmsNetId: "172.18.9.237.1.1", //Can be anything but needs to be in PLC StaticRoutes.xml file
  // localAdsPort: 34802,

  targetAmsNetId: "172.18.9.237.1.1",
  targetAdsPort: 851,

  // routerAddress: "172.18.9.237",
  // routerTcpPort: 5010,
});

app.use(express.static("lib"));

// To Remove Error since Express require middleware to translate JSON Object
// https://akhromieiev.com/req-body-undefined-express/
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// async function write(item, value) {
//   let connect = await client.connect();
//   try {
//     const res = await client.writeSymbol(item, value);
//     await client.disconnect();
//   } catch (err) {
//     console.log("Reading failed:", err);
//     await client.disconnect();
//   }
// }

// ******************************************************************************************************* //

app.get("/", async function (req, res) {
  await client.connect();
  AnlgIn_PressureReg = client.readSymbol(
    "MAIN.Application.ModuleManager.TBot.AnlgIn_PressureReg"
  );
  // client.subscribe("MAIN.Application.ModuleManager.TBot.AnlgIn_PressureReg");
  AnlgIn_PressureReg.then(function (result) {
    console.log(result);
    res.send(toJson(result));
  });
});

// app.post("/", (req, res) => {
//   console.log(req.body.ID);
//   write(
//     "MAIN.Application.ModuleManager.TBot.AnlgIn_PressureReg.rActualValue",
//     req.body.AnalogValue
//   );
//   res.sendStatus(200);
// });

app.listen(port, () => {
  console.log(`Apppp listening on port ${port}`);
});

function toJson(data) {
  return JSON.stringify(data, (_, v) =>
    typeof v === "bigint" ? `${v}n` : v
  ).replace(/"(-?\d+)n"/g, (_, a) => a);
}

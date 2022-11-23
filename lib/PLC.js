const ads = require("ads-client");

// Lib to read Symbol Value
const client = new ads.Client({
  // localAmsNetId: "172.18.9.237.1.1", //Can be anything but needs to be in PLC StaticRoutes.xml file
  // localAdsPort: 34802,

  targetAmsNetId: "172.18.9.237.1.1",
  targetAdsPort: 851,

  // routerAddress: "172.18.9.237",
  // routerTcpPort: 5010,
});

// module.exports= function read(item){ client.connect().then((res) => {
//   client
//     .readSymbol(item)
//     .then((res) => {
//       console.log(`Value read: ${res.value}`);
//       return res.value
//     })
//     .catch((err) => {
//       console.log("Something failed:", err);
//     });
// });}

function toJson(data) {
  return JSON.stringify(data, (_, v) =>
    typeof v === "bigint" ? `${v}n` : v
  ).replace(/"(-?\d+)n"/g, (_, a) => a);
}

module.exports = async function read(item) {
  try {
    const res = await client.readSymbol(item);
    return toJson(res.value);
  } catch (err) {
    console.log("Reading failed:", err);
  }
};




// module.exports = async function read(item, item2) {
//   let connect = await client.connect();

//   try {
//     const value = await client.convertFromRaw(
//       await client.readRawByName(item),
//       item2
//     );
//     console.log(value)
//     client.disconnect();
//     return toJson(value);
//   } catch (err) {
//     console.log("Reading failed:", err);
//     client.disconnect();
//   }
// };

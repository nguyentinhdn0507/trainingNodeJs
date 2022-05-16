const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = process.env.URLMONGO;
let client;
const getDbInstance = async () => {
  try {
    if (!client) {
      client = await MongoClient.connect(url);
    }
    return client.db("trainingnodejs");
  } catch (error) {
    throw new Error("Can Not Connect DataBase");
  }
};
module.exports = {
  getDbInstance,
};


import dotenv from "dotenv";
import { MongoClient } from "mongodb";

class MongoDBService {
  constructor() {
    dotenv.config();
    this.connect();
  }
  connect() {
    const client = new MongoClient(process.env.MONGODB_URL);
    client.connect().then(() => {
      this.db = client.db("Voyzaa");
      process.on("SIGINT", async () => {
        console.log("Shutting down gracefully...");
        await client.close();
        process.exit(0);
      });
    });
  }
  async insertItem(reqObj) {
    const collection = this.db.collection(reqObj.tableName);
    await collection.insertOne(reqObj.item);
  }
  async getItem(reqObj) {
    const collection = this.db.collection(reqObj.tableName);
    const result = await collection.findOne(reqObj.key);
    return result;
  }
  async getItems(reqObj) {
    const projectionObject = { _id: 0 };
    if (reqObj.requestedAttributes) {
      reqObj.requestedAttributes.forEach((attribute) => {
        projectionObject[attribute] = 1;
      });
    }
    const collection = this.db.collection(reqObj.tableName);
    const result = await collection
      .find(
        { [reqObj.conditionKey]: reqObj.conditionValue },
        { projection: projectionObject }
      )
      .toArray();
    return [result, result.length];
  }
  async updateItem(reqObj) {
    const collection = this.db.collection(reqObj.tableName);
    await collection.updateOne(reqObj.key, {
      $set: { [reqObj.expressionKey]: reqObj.expressionValue },
    });
  }
  async deleteItem(reqObj) {
    const collection = this.db.collection("Test");
    await collection.deleteOne({ id: "0" });
  }
}

export default new MongoDBService();

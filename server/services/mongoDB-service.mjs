import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { AppError } from "../errors.mjs";

class MongoDBService {
  constructor() {
    dotenv.config();
    this.connect();
  }
  connect() {
    try {
      const client = new MongoClient(process.env.MONGODB_URL);
      client.connect().then(() => {
        this.db = client.db("Voyzaa");
        process.on("SIGINT", async () => {
          console.log("Shutting down gracefully...");
          await client.close();
          process.exit(0);
        });
      });
    } catch (error) {
      throw new AppError("Database error", 500);
    }
  }
  async insertItem(reqObj) {
    try {
      const collection = this.db.collection(reqObj.tableName);
      await collection.insertOne(reqObj.item);
    } catch (error) {
      throw new AppError("Database error", 500);
    }
  }
  async getItem(reqObj) {
    try {
      const collection = this.db.collection(reqObj.tableName);
      const result = await collection.findOne(reqObj.key);
      return result;
    } catch (error) {
      throw new AppError("Database error", 500);
    }
  }
  async getItems(reqObj) {
    const projectionObject = { _id: 0 };
    if (reqObj.requestedAttributes) {
      reqObj.requestedAttributes.forEach((attribute) => {
        projectionObject[attribute] = 1;
      });
    }
    try {
      const collection = this.db.collection(reqObj.tableName);
      const result = await collection
        .find(
          { [reqObj.conditionKey]: reqObj.conditionValue },
          { projection: projectionObject },
        )
        .toArray();
      return [result, result.length];
    } catch (error) {
      throw new AppError("Database error", 500);
    }
  }
  async updateItem(reqObj) {
    try {
      const collection = this.db.collection(reqObj.tableName);
      await collection.updateOne(reqObj.key, {
        $set: { [reqObj.expressionKey]: reqObj.expressionValue },
      });
    } catch (error) {
      throw new AppError("Database error", 500);
    }
  }
  async deleteItem(reqObj) {
    try {
      const collection = this.db.collection(reqObj.tableName);
      await collection.deleteOne({ id: "0" });
    } catch (error) {
      throw new AppError("Database error", 500);
    }
  }
}

export default new MongoDBService();

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

class DynamoDBService {
  constructor() {
    this.client = new DynamoDBClient({});
    this.dynamo = DynamoDBDocumentClient.from(this.client);
  }
  async insertItem(reqObj) {
    const response = await this.dynamo.send(
      new PutCommand({
        TableName: reqObj.tableName,
        Item: reqObj.item,
      })
    );
    return response;
  }
  async getItem(reqObj) {
    try {
      const response = await this.dynamo.send(
        new GetCommand({
          TableName: reqObj.tableName,
          Key: reqObj.key,
        })
      );
      return response.Item;
    } catch (err) {
      return { err, mes: err.message };
    }
  }
  async getItems(reqObj) {
    let items = [];
    let count = 0;
    let ExclusiveStartKey;
    let projectionExpressionValue = "";
    let reservedValues = {};
    if (reqObj.requestedAttributes) {
      reqObj.requestedAttributes = reqObj.requestedAttributes.map(
        (attribute) => {
          if (attribute.toUpperCase() === "NAME") {
            reservedValues[`#${attribute}`] = attribute;
            attribute = `#${attribute}`;
          }
          return attribute;
        }
      );
      reqObj.requestedAttributes.forEach((attribute, index) => {
        projectionExpressionValue += attribute;
        if (index !== reqObj.requestedAttributes.length - 1) {
          projectionExpressionValue += ",";
        }
      });
    }
    let queryObj = {
      TableName: reqObj.tableName,
      IndexName: reqObj.indexName,
      KeyConditionExpression: `${reqObj.conditionKey} = :value`,
      ExpressionAttributeValues: {
        ":value": reqObj.conditionValue,
      },
      ExclusiveStartKey,
    };
    if (projectionExpressionValue) {
      queryObj.ProjectionExpression = projectionExpressionValue;
      if (Object.keys(reservedValues).length > 0) {
        queryObj.ExpressionAttributeNames = reservedValues;
      }
    }
    do {
      const response = await this.dynamo.send(new QueryCommand(queryObj));
      items.push(...response.Items);
      count += response.Count;
      ExclusiveStartKey = response.LastEvaluatedKey;
    } while (ExclusiveStartKey);
    return [items, count];
  }
  async updateItem(reqObj) {
    const response = await this.dynamo.send(
      new UpdateCommand({
        TableName: reqObj.tableName,
        Key: reqObj.key,
        /*
        ToDo
        UpdateExpression: `
        SET #name = :name
      `,
      ExpressionAttributeNames: {
        "#name": "name", // avoid reserved words
      },
      },
        */
        UpdateExpression: `
                  SET ${reqObj.expressionKey} = :value
                `,
        ExpressionAttributeValues: {
          ":value": reqObj.expressionValue,
        },
        ReturnValues: "ALL_NEW",
      })
    );
    return response;
  }
  async deleteItem(reqObj) {}
}

export default new DynamoDBService();

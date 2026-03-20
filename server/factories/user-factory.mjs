import dbService from "../services/db-service.mjs";
import argon from "argon2";
import jwt from "jsonwebtoken";
import TokenFactory from "./token-factory.mjs";
import tokenFactory from "./token-factory.mjs";
import { ValidationError } from "../errors.mjs";

class UserFactory {
  async registerUser(reqObj) {
    if (!reqObj.username || !reqObj.password) {
      throw new ValidationError("400-900");
    }
    const [, count] = await dbService.getItems({
      tableName: "Users",
      indexName: "UsernameIndex",
      conditionKey: "Username",
      conditionValue: reqObj.username,
    });
    if (!count === 0) {
      throw new ValidationError("400-901");
    }
    let data = await dbService.getItem({
      tableName: "Ids",
      key: {
        Resource: "User",
      },
    });
    const userId = (parseInt(data.LastId) + 1).toString();
    const hash = await argon.hash(reqObj.password, {
      type: argon.argon2id,
    });
    const user = {
      Id: userId,
      Username: reqObj.username,
      Password: hash,
    };
    await dbService.insertItem({ tableName: "Users", item: user });
    const resp = await dbService.updateItem({
      tableName: "Ids",
      key: {
        Resource: "User",
      },
      expressionKey: "LastId",
      expressionValue: userId,
    });
  }

  async login(reqObj) {
    if (!reqObj.username || !reqObj.password) {
      throw new ValidationError("400-900");
    }
    const [userData, count] = await dbService.getItems({
      tableName: "Users",
      indexName: "UsernameIndex",
      conditionKey: "Username",
      conditionValue: reqObj.username,
    });
    if (count === 0) {
      throw new ValidationError("400-900");
    }
    const user = userData[0];
    const isCorrectPassword = await argon.verify(
      user.Password,
      reqObj.password,
    );
    if (!isCorrectPassword) {
      throw new ValidationError("400-900");
    }
    const accessToken = TokenFactory.generateAccessToken({
      user: { username: user.Username, userId: user.Id },
    });
    const refreshToken = jwt.sign(
      { username: user.Username, userId: user.Id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1h",
      },
    );
    const csrfToken = tokenFactory.generateCsrfToken();
    return {
      username: user.Username,
      accessToken,
      refreshToken,
      csrfToken,
    };
  }
}

export default new UserFactory();

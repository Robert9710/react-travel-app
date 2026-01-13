import DBService from "../services/db-service.mjs";
import argon from "argon2";
import jwt from "jsonwebtoken";
import TokenFactory from "./token-factory.mjs";
import tokenFactory from "./token-factory.mjs";

class UserFactory {
  async registerUser(reqObj) {
    if (reqObj.username && reqObj.password) {
      const [, count] = await DBService.getItems({
        tableName: "Users",
        indexName: "UsernameIndex",
        conditionKey: "Username",
        conditionValue: reqObj.username,
      });
      if (count === 0) {
        let data = await DBService.getItem({
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
        await DBService.insertItem({ tableName: "Users", item: user });
        const resp = await DBService.updateItem({
          tableName: "Ids",
          key: {
            Resource: "User",
          },
          expressionKey: "LastId",
          expressionValue: userId,
        });
      }
      return { message: "User not created" };
    }
    return { message: "Err" };
  }

  async login(reqObj) {
    if (reqObj.username && reqObj.password) {
      const [userData, count] = await DBService.getItems({
        tableName: "Users",
        indexName: "UsernameIndex",
        conditionKey: "Username",
        conditionValue: reqObj.username,
      });
      if (count > 0) {
        const user = userData[0];
        const isCorrectPassword = await argon.verify(
          user.Password,
          reqObj.password
        );
        if (isCorrectPassword) {
          const accessToken = TokenFactory.generateAccessToken({
            user: { username: user.Username, userId: user.Id },
          });
          const refreshToken = jwt.sign(
            { username: user.Username, userId: user.Id },
            process.env.REFRESH_TOKEN_SECRET,
            {
              expiresIn: "1h",
            }
          );
          const csrfToken = tokenFactory.generateCsrfToken();
          return {
            username: user.Username,
            accessToken,
            refreshToken,
            csrfToken,
          };
        } else {
          return { errMsg: "Invalid credentials" };
        }
      }
      return { message: "" };
    }
    return { message: "Err" };
  }
}

export default new UserFactory();

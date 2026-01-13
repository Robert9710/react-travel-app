import jwt from "jsonwebtoken";
import crypto from "crypto";

class TokenFactory {
  generateAccessToken(reqObj) {
    let accessToken;
    //   if (!reqObj.refreshToken) {
    //   return res.sendStatus(401);
    // }
    // if (!refreshTokens.includes(reqObj.refreshToken)) {
    //   return res.sendStatus(403);
    // }
    if (reqObj?.refreshToken) {
      jwt.verify(
        reqObj.refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) {
            // return res.sendStatus(403);
          }
          accessToken = jwt.sign(
            { username: user.username, userId: user.userId },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "15m",
            }
          );
          // res.json({ accessToken });
        }
      );
    } else if (reqObj?.user) {
      accessToken = jwt.sign(
        { username: reqObj.user.username, userId: reqObj.user.userId },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );
    } else {
      accessToken = jwt.sign({}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
    }
    console.log(accessToken);
    return accessToken;
  }

  generateRefreshToken(reqObj) {
    let refreshToken;
    if (reqObj?.user) {
      refreshToken = jwt.sign(
        { username: reqObj.user.username, userId: reqObj.user.userId },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );
    }
    return refreshToken;
  }

  generateCsrfToken() {
    return crypto.randomBytes(32).toString("hex");
  }

  authenticateToken(req, res, next) {
    if (
      req.path !== "/register" &&
      req.path !== "/login" &&
      req.path !== "/token"
    ) {
      if (req.method !== "GET") {
        const csrfCookie = req.cookies.csrf_token;
        const csrfHeader = req.headers["csrf-token"];

        if (!csrfCookie || !csrfHeader) {
          return res.status(403).json({ message: "CSRF token missing" });
        }

        if (csrfCookie !== csrfHeader) {
          return res.status(403).json({ message: "Invalid CSRF token" });
        }
      }
      const token = req.cookies.access_token;
      if (!token) {
        return res.sendStatus(401);
      }
      // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      //   if (err) {
      //     // if (err.name === "TokenExpiredError")
      //     return res.sendStatus(403);
      //   }
      //   req.user = user;
      //   next();
      // });
      try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
      } catch (err) {
        // if (err.name === "TokenExpiredError")
        /*
        err = {
        name: 'TokenExpiredError',
        message: 'jwt expired',
        expiredAt: 1408621000
      }
        err = {
        name: 'JsonWebTokenError',
        message: 'jwt malformed'
      }
        'invalid token' - the header or payload could not be parsed
        'jwt malformed' - the token does not have three components (delimited by a .)
        'jwt signature is required'
        'invalid signature'
        */
        return res.sendStatus(403);
      }
    } else if (req.path === "/token") {
      const token = req.cookies.access_token;
      if (!token) {
        next();
      }
      try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        res.sendStatus(204);
      } catch (err) {
        next();
      }
    } else {
      next();
    }
  }
}

export default new TokenFactory();

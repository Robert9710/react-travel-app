export class AppError extends Error {
  constructor(message, errorCode, statusCode = 500) {
    super(message || errorCodeMap[errorCode]);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export class ValidationError extends AppError {
  constructor(errorCode, message) {
    super(message, errorCode, 400);
  }
}

export class InvalidTokenError extends AppError {
  constructor(errorCode, message, statusCode = 403) {
    super(message, errorCode, statusCode);
  }
}

export class AccessDeniedError extends AppError {
  constructor(errorCode, message, statusCode = 403) {
    super(message, errorCode, statusCode);
  }
}

const errorCodeMap = {
  "400-100": "Article id must be a non-empty string",
  "400-101": "Article name must be a non-empty string",
  "400-102": "An article with the same name already exists",
  "400-200": "Topic id must be a non-empty string",
  "400-201": "Topic name must be a non-empty string",
  "400-900": "Invalid username or password",
  "400-901": "A user with the same username has already been registered",
  "401-100": "Invalid access token",
  "401-200": "User is not authorized to perform this action",
  "403-100": "Access token has expired",
  "403-101": "Refresh token has expired",
  "403-200": "User is not authorized to access this resource",
};

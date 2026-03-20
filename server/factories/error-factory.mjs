class ErrorFactory {
  constructor() {
    this.errors = {
      "400-100": {
        statusCode: 400,
        error: {
          name: "Invalid article id",
          message: `${reqObj.articleId} is not a valid article id`,
        },
      },
      "400-101": {
        statusCode: 400,
        error: {
          name: "Invalid topic id",
          message: `${reqObj.topicId} is not a valid topic id`,
        },
      },
    };
  }
  getError(errorCode) {
    return this.errors[errorCode];
  }
}

export default new ErrorFactory();

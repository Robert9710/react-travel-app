class DBService {
  async init() {
    if (process.env.NODE_ENV === "production") {
      return await import("./dynamoDB-service.mjs");
    } else {
      return await import("./mongoDB-service.mjs");
    }
  }
}

export default (await new DBService().init()).default;

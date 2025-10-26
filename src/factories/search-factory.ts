import appConfig from "../application/config.json";

class SearchFactory {
  #apiDomain;
  constructor() {
    this.#apiDomain =
      process.env.NODE_ENV === "development"
        ? appConfig.DevVariables.apiDomain
        : appConfig.ProdVariables.apiDomain;
  }
  async getSearchSuggestions(reqObj: { query: string; maxCount: number }) {
    const response = await fetch(
      `${this.#apiDomain}/search/suggestions?q=${reqObj.query}&maxCount=${
        reqObj.maxCount
      }`
    );
    return await response.json();
  }
  async getSearchResults(reqObj: {
    query: string;
    pagenum: number;
    pagesize: number;
  }) {
    let queryParams = "q=" + reqObj.query;
    if (reqObj.pagesize) {
      queryParams +=
        "&pagenum=" + reqObj.pagenum + "&pagesize=" + reqObj.pagesize;
    }
    const response = await fetch(`${this.#apiDomain}/search?${queryParams}`);
    return await response.json();
  }
}

export default new SearchFactory();

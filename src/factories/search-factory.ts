import appConfig from "../application/config.json";

class SearchFactory {
  async getSearchSuggestions(reqObj: { query: string; maxCount: number }) {
    const response = await fetch(
      `${appConfig.Variables.apiDomain}/search/suggestions?q=${reqObj.query}&maxCount=${reqObj.maxCount}`
    );
    return await response.json();
  }
  async getSearchResults(reqObj: {
    query: string;
    pagenum: number;
    pagesize: number;
  }) {
    const response = await fetch(
      `${appConfig.Variables.apiDomain}/search?q=${reqObj.query}`
    );
    return await response.json();
  }
}

export default new SearchFactory();

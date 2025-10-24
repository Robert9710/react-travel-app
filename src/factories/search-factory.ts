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
    let queryParams = "q=" + reqObj.query;
    if (reqObj.pagesize) {
      queryParams +=
        "&pagenum=" + reqObj.pagenum + "&pagesize=" + reqObj.pagesize;
    }
    const response = await fetch(
      `${appConfig.Variables.apiDomain}/search?${queryParams}`
    );
    return await response.json();
  }
}

export default new SearchFactory();

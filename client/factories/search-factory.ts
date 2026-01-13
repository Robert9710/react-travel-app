import { SearchSuggestions } from "../application/types";
import HttpService from "../services/http-service";

class SearchFactory {
  async getSearchSuggestions(reqObj: {
    queryParams: { query: string; maxCount: string } & Record<string, string>;
  }) {
    const response = await HttpService.fetchData({
      path: "/search/suggestions",
      queryParams: reqObj.queryParams,
    });
    return response;
  }
  async getSearchResults(reqObj: {
    queryParams: { query: string; pagenum: string; pagesize: string } & Record<
      string,
      string
    >;
  }): Promise<SearchSuggestions> {
    const response = await HttpService.fetchData({
      path: "/search",
      queryParams: reqObj.queryParams,
    });
    return response;
  }
}

export default new SearchFactory();

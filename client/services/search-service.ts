import { PaginationQueryParams } from "../application/types";
import httpService from "./http-service";

class SearchService {
  async getSearchSuggestions(reqObj: {
    queryParams: { query: string; maxCount: string };
  }) {
    let relativeUrl = `/search/suggestions`;
    if (reqObj.queryParams) {
      relativeUrl += "?" + new URLSearchParams(reqObj.queryParams);
    }
    const response = await httpService.fetchData({
      relativeUrl,
    });
    return this.#handleResponse(response);
  }

  async getSearchResults(reqObj: {
    queryParams: { query: string } & PaginationQueryParams;
  }) {
    let relativeUrl = `/search`;
    if (reqObj.queryParams) {
      relativeUrl += "?" + new URLSearchParams(reqObj.queryParams);
    }
    const response = await httpService.fetchData({
      relativeUrl,
    });
    return this.#handleResponse(response);
  }

  #handleResponse<T>(response: T) {
    return response;
  }
}
export default new SearchService();

import { PaginationQueryParams } from "../application/types";
import searchService from "../services/search-service";

class SearchFactory {
  async getSearchSuggestions(reqObj: {
    queryParams: { query: string; maxCount: string };
  }) {
    const response = await searchService.getSearchSuggestions({
      queryParams: reqObj.queryParams,
    });
    return response;
  }

  async getSearchResults(reqObj: {
    queryParams: { query: string } & PaginationQueryParams;
  }) {
    const response = await searchService.getSearchResults({
      queryParams: reqObj.queryParams,
    });
    return response;
  }
}

export default new SearchFactory();

import { paginateResults } from "../utils.mjs";

class SearchFactory {
  async getSearchSuggestions(reqObj) {
    let results = [];
    topics.forEach((topic) => {
      if (topic.name.includes(reqObj.query)) {
        results.push({ resultType: "Topic", id: topic.id, name: topic.name });
      }
      topic.articles.forEach((article) => {
        if (
          article.name.includes(reqObj.query) ||
          article.content.includes(reqObj.query)
        ) {
          results.push({
            resultType: "Article",
            id: article.id,
            name: article.name,
            topicId: topic.id,
          });
        }
      });
    });
    if (reqObj.maxCount) {
      results = paginateResults({ results, pagesize: reqObj.maxCount });
    }
    return { suggestions: results };
  }

  async search(reqObj) {
    let articlesFound = [];
    let topicsFound = [];
    let results = { articles: [], topics: [] };
    if (reqObj.maxCount) {
      reqObj.pagesize = reqObj.maxCount;
    }
    topics.forEach((topic) => {
      if (topic.name.includes(reqObj.query)) {
        topicsFound.push({
          id: topic.id,
          name: topic.name,
          articleCount: topic.articles.length,
        });
      }
      topic.articles.forEach((article) => {
        if (
          article.name.includes(reqObj.query) ||
          article.content.includes(reqObj.query)
        ) {
          articlesFound.push({
            id: article.id,
            name: article.name,
            topicId: topic.id,
          });
        }
      });
    });
    if (articlesFound.length > 0) {
      results.articles = paginateResults({
        results: articlesFound,
        pagenum: reqObj.pagenum,
        pagesize: reqObj.pagesize,
      });
    }
    if (
      (!reqObj.pagesize ||
        results.articles.length < reqObj.pagesize * reqObj.pagenum) &&
      topicsFound.length > 0
    ) {
      results.topics = paginateResults({
        results: topicsFound,
        pagenum: articlesFound.length > 0 ? 1 : reqObj.pagenum,
        pagesize: reqObj.pagesize - results.articles.length,
      });
    }
    return {
      articles: results.articles,
      topics: results.topics,
      paginationInfo: {
        count: articlesFound.length + topicsFound.length,
        pagenum: reqObj.pagenum || 1,
        pagesize:
          reqObj.pagesize || results.articles.length + results.topics.length,
      },
    };
  }
}

export default new SearchFactory();

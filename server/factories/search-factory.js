import { topics } from "../server.js";
import { paginateResults } from "../utils.js";

class SearchFactory {
  getSearchSuggestions = (reqObj) => {
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
  };

  search = (reqObj) => {
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
      (!reqObj.pagesize || results.articles.length < reqObj.pagesize) &&
      topicsFound.length > 0
    ) {
      results.topics = paginateResults({
        results: topicsFound,
        pagenum: results.articles.length > 0 ? 1 : reqObj.pagenum,
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
  };
}

let searchFactory = new SearchFactory();
export default searchFactory;

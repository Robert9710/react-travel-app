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
      results = paginateResults(results, reqObj.maxCount);
    }
    return { suggestions: results };
  };

  search = (reqObj) => {
    let articlesFound = [];
    let topicsFound = [];
    topics.forEach((topic) => {
      if (topic.name.includes(reqObj.query)) {
        topicsFound.push({
          resultType: "Topic",
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
            resultType: "Article",
            id: article.id,
            name: article.name,
            topicId: topic.id,
          });
        }
      });
    });
    let results = {
      articles: paginateResults({
        results: articlesFound,
        pagenum: reqObj.pagenum,
        pagesize: reqObj.pagesize,
      }),
    };
    if (results.articles.length < reqObj.pagesize) {
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
        count: results.articles.length + results.topics.length,
        pagenum: reqObj.pagenum || 1,
        pagesize:
          reqObj.pagesize || results.articles.length + results.topics.length,
      },
    };
  };
}

let searchFactory = new SearchFactory();
export default searchFactory;

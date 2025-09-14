import { topics } from "../server.js";

class SearchFactory {
  getSearchSuggestions = (query) => {
    let results = [];
    topics.forEach((topic) => {
      if (topic.name.includes(query)) {
        results.push({ resultType: "Topic", id: topic.id, name: topic.name });
      }
      topic.articles.forEach((article) => {
        if (article.name.includes(query) || article.content.includes(query)) {
          results.push({
            resultType: "Article",
            id: article.id,
            name: article.name,
            topicId: topic.id,
          });
        }
      });
    });
    return results;
  };

  search = (query) => {
    let results = [];
    topics.forEach((topic) => {
      if (topic.name.includes(query)) {
        results.push({
          resultType: "Topic",
          id: topic.id,
          name: topic.name,
          articleCount: topic.articles.length,
        });
      }
      topic.articles.forEach((article) => {
        if (article.name.includes(query) || article.content.includes(query)) {
          results.push({
            resultType: "Article",
            id: article.id,
            name: article.name,
            topicId: topic.id,
          });
        }
      });
    });
    return results;
  };
}

let searchFactory = new SearchFactory();
export default searchFactory;

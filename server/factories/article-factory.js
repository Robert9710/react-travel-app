import { topics } from "../server.js";
import topicFactory from "./topic-factory.js";
import { paginateResults } from "../utils.js";
import fs from "fs";

class ArticleFactory {
  getArticle = (reqObj) => {
    const topic = reqObj.topicId
      ? topicFactory.getTopic({ topicId: reqObj.topicId })
      : topicFactory.getTopicForArticle({ articleId: reqObj.articleId });
    const article = topic.articles.find(
      (article) => article.id === reqObj.articleId
    );
    article.topicSummary = { id: topic.id, name: topic.name };
    return {
      article: article,
    };
  };

  getRelatedArticles = (reqObj) => {
    const topic = reqObj.topicId
      ? topicFactory.getTopic({ topicId: reqObj.topicId })
      : topicFactory.getTopicForArticle({ articleId: reqObj.articleId });
    const relatedArticles = paginateResults({
      results: topic.articles.filter(
        (article) => article.id !== reqObj.articleId
      ),
      pagenum: reqObj.pagenum,
      pagesize: reqObj.pagesize,
    });
    return {
      articles: relatedArticles.map((article) => ({
        id: article.id,
        name: article.name,
      })),
      paginationInfo: {
        count: relatedArticles.length,
        pagenum: reqObj.pagenum || 1,
        pagesize: reqObj.pagesize || relatedArticles.length,
      },
    };
  };

  getArticlesInTopic = (reqObj) => {
    const topic = topicFactory.getTopic({ topicId: reqObj.topicId });
    const articles = paginateResults({
      results: topic.articles.map((article) => ({
        id: article.id,
        name: article.name,
      })),
      pagenum: reqObj.pagenum,
      pagesize: reqObj.pagesize,
    });
    return {
      articles: articles,
      paginationInfo: {
        count: topic.articles.length,
        pagenum: reqObj.pagenum || 1,
        pagesize: reqObj.pagesize || topic.articles.length,
      },
    };
  };

  createArticle = (reqObj) => {
    const topic = topics.find((topic) => topic.id === reqObj.topicId);
    const isDuplicateArticle = !!topic.articles.find(
      (article) => article.name === reqObj.name
    );
    if (!isDuplicateArticle) {
      topic.articles.push({
        id: getNextArticleId(),
        name: reqObj.name,
        recommended: reqObj.recommendedMonths,
        content: reqObj.content,
      });
      fs.writeFile(`./server/data/Topics.json`, JSON.stringify(topics));
      return true;
    } else {
      return false;
    }
  };

  getNextArticleId = () => {
    let nextArticleId = 100;
    topics.forEach((topic) => {
      topic.articles.forEach((article) => {
        if (article.id > nextArticleId) {
          nextArticleId = parseInt(article.id);
        }
      });
    });
    nextArticleId += 1;
    return nextArticleId.toString();
  };
}

let articleFactory = new ArticleFactory();
export default articleFactory;

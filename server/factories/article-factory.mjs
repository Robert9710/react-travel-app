import { topics } from "../server.mjs";
import topicFactory from "./topic-factory.mjs";
import { paginateResults } from "../utils.mjs";
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
        count: topic.articles.length - 1,
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
    reqObj.pagenum = parseInt(reqObj.pagenum);
    reqObj.pagesize = parseInt(reqObj.pagesize);
    return {
      articles: articles,
      paginationInfo: {
        count: topic.articles.length,
        pagenum: reqObj.pagenum || 1,
        pagesize: reqObj.pagesize || articles.length,
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
        id: this.getNextArticleId(),
        name: reqObj.name,
        recommendedMonths: reqObj.recommendedMonths,
        content: reqObj.content,
      });
      fs.writeFile(
        `./server/data/Topics.json`,
        JSON.stringify(topics),
        (err) => {}
      );
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

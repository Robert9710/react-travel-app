import { topics } from "../server.js";
import topicFactory from "./topic-factory.js";
import fs from "fs";

class ArticleFactory {
  getArticle = (articleId, topicId) => {
    const topic = topicId
      ? topicFactory.getTopic(topicId)
      : topicFactory.getTopicForArticle(articleId);
    const article = topic.articles.find((article) => article.id === articleId);
    article.topicSummary = { id: topic.id, name: topic.name };
    return {
      article: article,
    };
  };

  getRelatedArticles = (articleId, topicId) => {
    const topic = topicId
      ? topicFactory.getTopic(topicId)
      : topicFactory.getTopicForArticle(articleId);
    const relatedArticles = topic.articles.filter(
      (article) => article.id !== articleId
    );
    return {
      articles: relatedArticles.map((article) => ({
        id: article.id,
        name: article.name,
      })),
      paginationInfo: { count: relatedArticles.length },
    };
  };

  getArticlesInTopic = (topicId) => {
    const topic = topicFactory.getTopic(topicId);
    return {
      articles: topic.articles.map((article) => ({
        id: article.id,
        name: article.name,
      })),
      paginationInfo: {
        count: topic.articles.length,
      },
    };
  };

  createArticle = (topicId, name, content, recommendedMonths) => {
    const topic = topics.find((topic) => topic.id === topicId);
    const isDuplicateArticle = !!topic.articles.find(
      (article) => article.name === name
    );
    if (!isDuplicateArticle) {
      topic.articles.push({
        id: getNextArticleId(),
        name: name,
        recommended: recommendedMonths,
        content: content,
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

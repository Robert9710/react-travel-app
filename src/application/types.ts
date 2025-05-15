export interface ArticleIdentifiers {
  id: string;
  title: string;
}

export interface Article extends ArticleIdentifiers {
  content: string;
}

export interface RelatedArticles {
  articles: ArticleIdentifiers[];
}

export interface Topic {
  title: string;
  articles: ArticleIdentifiers[];
}

export interface Topics {
  topics: Topic[];
}

export interface ArticleProps {
  topicTitle: string;
  articleId: string;
}

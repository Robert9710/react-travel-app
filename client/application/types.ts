export interface PaginationInfo {
  count: number;
  pagenum: number;
  pagesize: number;
}

export type PaginationQueryParams = {
  pagenum?: string;
  pagesize: string;
};

export interface ArticleDetails {
  id: string;
  name: string;
}

export interface Article {
  article: ArticleDetails & {
    recommendedMonths: string;
    content: string;
    topicSummary: { id: string; name: string; articleCount: number };
  };
}

export interface Articles {
  articles: ArticleDetails[];
  paginationInfo: PaginationInfo;
}

export interface ArticleProps {
  topicId?: string;
  articleId: string;
}

export interface Topic {
  topic: { id: string; name: string; articleCount: number };
}

export interface Topics {
  topics: Topic["topic"][];
  paginationInfo: PaginationInfo;
}

export interface ApiError {
  error: {
    message: string;
    errorCode: string;
  };
}

export type TopicSearchSuggestion = Topic;

export type ArticleSearchSuggestion = {
  id: string;
  name: string;
  topicId: string;
};

export type SearchSuggestions = {
  articles: ArticleSearchSuggestion[];
  topics: TopicSearchSuggestion[];
  paginationInfo: PaginationInfo;
};

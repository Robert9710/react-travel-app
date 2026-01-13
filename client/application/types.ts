export interface PaginationInfo {
  count: number;
  pagenum: number;
  pagesize: number;
}

export interface ArticleDetails {
  id: string;
  name: string;
}

export interface Article extends ArticleDetails {
  recommendedMonths: string;
  content: string;
  topicSummary: { id: string; name: string };
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
  id: string;
  name: string;
  articleCount: number;
}

export interface Topics {
  topics: Topic[];
  paginationInfo: PaginationInfo;
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

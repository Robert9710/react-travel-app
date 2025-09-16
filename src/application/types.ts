type PaginationInfo = {
  count: number;
};

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
  topicId: string;
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

type GeneralSearchSuggestion = {
  resultType: string;
  id: string;
  name: string;
};

export type ArticleSearchSuggestion = GeneralSearchSuggestion & {
  topicId: string;
};

export type SearchSuggestion =
  | GeneralSearchSuggestion
  | ArticleSearchSuggestion;

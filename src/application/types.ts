export interface Article {
  id: string;
  title: string;
  content: string;
}

export interface Topic {
  title: string;
  articles: Article[];
}

export interface Topics {
  topics: Topic[];
}

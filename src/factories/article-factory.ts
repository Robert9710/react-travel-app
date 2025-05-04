class ArticleFactory {
  constructor() {
    console.log("Article Factory");
  }

  getArticle(): Promise<number> {
    return new Promise((res) => {
      res(26);
    });
  }
}

export default new ArticleFactory();

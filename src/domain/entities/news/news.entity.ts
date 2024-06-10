// News Entity
export class News {
  id?: number;
  author: string;
  headline: string;
  abstract: string;
  article_uri: string;
  image: string;

  constructor(model: News) {
    this.id = model.id;
    this.headline = model.headline;
    this.author = model.author;
    this.abstract = model.abstract;
    this.article_uri = model.article_uri;
    this.image =
      'https://nypost.com/wp-content/uploads/sites/2/2024/04/79582612.jpg';
  }
}

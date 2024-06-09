// News Entity
export class News {
  id?: number;
  author: string;
  title: string;
  description: string;
  url: string;
  image: string;

  constructor(model: News) {
    this.id = model.id;
    this.title = model.title;
    this.author = model.author;
    this.description = model.description;
    this.url = model.url;
    this.image = '';
  }
}

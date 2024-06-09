// TODO: sample post entity
export class Post {
  userId: number;
  title: string;
  body: string;

  constructor(model: Post) {
    this.userId = model.userId;
    this.title = model.title;
    this.body = model.body;
  }
}

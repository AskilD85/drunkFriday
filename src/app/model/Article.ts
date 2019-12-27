export class Article {
    id: any;
    title: string;
    body: Text;
    constructor(id: string, title: string, body: Text) {
        this.id = id;
        this.title = title;
        this.body = body;
    }

}

export class Categories {
    id: string;
    title: string;
    name: string;
    body: Text;
    // tslint:disable-next-line:variable-name
    author_id: string;
    // tslint:disable-next-line:variable-name
    constructor(id: string, title: string, name: string, body: Text, author_id: string) {
        this.id = id;
        this.title = title;
        this.name = name;
        this.body = body;
        this.author_id = author_id;
    }
}

export class Article {
    id: any;
    title: string;
    body: string;
    active: number;
    category_id: string;
    constructor(id: string, title: string, body: string, active: number, category_id: string) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.active = active;
        this.category_id = category_id;
    }

}

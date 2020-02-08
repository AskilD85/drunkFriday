export class Article {
    id: any;
    title: string;
    body: string;
    active: number;
    // tslint:disable-next-line:variable-name
    category_id: string;
    // tslint:disable-next-line:variable-name
    created_at: Date;
    // tslint:disable-next-line:variable-name
    updated_at: Date;
    // tslint:disable-next-line:variable-name
    user_id: number;
    // tslint:disable-next-line: variable-name
    constructor(id: string, title: string, body: string, active: number, category_id: string, user_id: number) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.user_id = user_id;
        this.active = active;
        this.category_id = category_id;
    }

}

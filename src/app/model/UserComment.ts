export class UserComment {
    id: string;
    // tslint:disable-next-line:variable-name
    user_id: string;
    // tslint:disable-next-line:variable-name
    article_id: string;
    text: Text;
    // tslint:disable-next-line:variable-name
    created_at: Date;
    // tslint:disable-next-line:variable-name
    constructor(id: string, created_at: Date) {
        this.created_at = created_at;
        this.id = id;
    }
}

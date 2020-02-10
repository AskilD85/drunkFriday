export class User {
    id: number;
    name: string;
    age: string;
    email: string;
    sex: string;
    admin: boolean;
    type: string;
    stage: string;
    favorite: string;
    readytodrink: number;
    // tslint:disable-next-line:variable-name
    created_at: Date;
    data: Data;
    constructor(data: Data) {
        this.data = data;
    }

}

export class Data {
    id: string;
    name: string;
    email: string;
    created: Date;
    updated: Date;
    apitoken: string;
    alko: string;
    stage: string;
    age: string;
    type: string;
    readytodrink: string;
    favorite: string;
    constructor(email: string) {
        this.email = email;
    }
}

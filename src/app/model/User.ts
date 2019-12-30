export class User {
    id: string;
    name: string;
    age: string;
    sex: string;
    admin: boolean;
    stage: string;
    favorite: string;
    readytodrink: number;
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
    readytodrink: string;
    favorite: string;
}
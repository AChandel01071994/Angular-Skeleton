
export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public role: number,
        public expiration : string,
        public email : string,
        public access_token : string
    ) { }
}

export class TokenHeaders {
    constructor(
        public username: string,
        public password: string
    ) { }
}
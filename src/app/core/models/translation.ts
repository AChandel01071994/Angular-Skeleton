export class Translation {
    constructor(
        public id: number,
        public key: string,
        public lang: number,
        public value: string,
        public isActive: boolean
    ) { }
}
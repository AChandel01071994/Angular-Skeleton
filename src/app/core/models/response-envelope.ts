
export class ResponseEnvelope {
    constructor(
        public statusCode: number,
        public message: string,
        public isError: boolean,
        public result: any,
       public responseException: any
    ) { }
}
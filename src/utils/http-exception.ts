export class HttpException extends Error {
    status: number = 400
    message: string = ''

    constructor(status: number, message: string) {
        super();
        this.status = status
        this.message = message
    }
}
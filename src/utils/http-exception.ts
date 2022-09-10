export class HttpException extends Error {
    status: number = 400
    message: string = ''

    constructor(status: number, message: string) {
        super(message);
        this.status = status
        this.message = message
    }

    static BadRequest (message: string) {
        return new HttpException(400, message)
    }

}
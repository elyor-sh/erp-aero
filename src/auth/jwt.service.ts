import jwt from 'jsonwebtoken'
import {QueryBuilder} from "../database/query-builder";
import {TokenModel} from "./token.model";
import {JWT_ACCESS_KEY, JWT_REFRESH_KEY} from "../config/vars";
import {DataStoredToken} from "../interfaces/data-stored-token";

export class JwtService {

    constructor(private readonly tokenRepository: QueryBuilder) {
    }

    public async getRefreshToken (refreshToken: string):  Promise<TokenModel> {
        return this.tokenRepository.findOne<TokenModel>({refresh_token: refreshToken})
    }

    public async getRefreshTokenByUserId (id: string):  Promise<TokenModel> {
        return this.tokenRepository.findOne<TokenModel>({user_id: id})
    }

    public async updateRefreshToken (id: string, refreshToken: string):  Promise<TokenModel> {

        const newRefreshToken = this.generateRefreshToken(id)

        await this.tokenRepository.update({refresh_token: refreshToken}, `refresh_token = ${refreshToken}`)

        return this.getRefreshToken(newRefreshToken)
    }

    public async createRefreshToken (id: string): Promise<string> {
        const newRefreshToken = this.generateRefreshToken(id)

        await this.tokenRepository.create({user_id: id, refresh_token: newRefreshToken})

        const token = await this.getRefreshToken(newRefreshToken)

        return token.refresh_token
    }

    public async deleteRefreshToken (userId: string) {
        await this.tokenRepository.delete({user_id: userId})
    }

    public generateAccessToken (id: string): string {
        return jwt.sign(
            { id },
             JWT_ACCESS_KEY,
            { expiresIn: '10m' }
        )

    }

    public generateRefreshToken (id: string): string {
        return  jwt.sign(
            { id },
            JWT_REFRESH_KEY,
            { expiresIn: '15d' }
        )
    }

    public decodeAccessToken (token: string) {
        return jwt.verify(token, JWT_ACCESS_KEY) as DataStoredToken
    }
}

export const jwtService = new JwtService(new QueryBuilder('tokens'))
import bcrypt from 'bcryptjs'
import {UserService, userService} from "../user/user.service";
import {UserCreateDto} from "../user/user.dto";
import {HttpException} from "../utils/http-exception";
import {JwtService, jwtService} from "./jwt.service";

class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    public async login (params: UserCreateDto) {

        const user = await this.userService.getOne(params.id)

        if(!user){
            throw HttpException.BadRequest('User not found')
        }

        const isValidPass = await this.compare(params.password, user.password)

        if(!isValidPass){
            throw HttpException.BadRequest('Invalid password')
        }



        const {refresh_token} = await this.jwtService.checkRefreshToken(params.id)

        const accessToken = this.jwtService.generateAccessToken(params.id)

        return {
            user: {id: user.id}, refreshToken: refresh_token, accessToken
        }
    }

    public async register (params: UserCreateDto) {
       const candidate = await this.userService.getOne(params.id)

        if(candidate){
            throw HttpException.BadRequest( 'User not found')
        }

        const hashedPassword = await this.hashPassword(params.password)

        await this.userService.create({id: params.id, password: hashedPassword})

        const refreshToken = await this.jwtService.createRefreshToken(params.id)
        const accessToken = this.jwtService.generateAccessToken(params.id)

        return {
            refreshToken: refreshToken.refresh_token, accessToken
        }
    }

    public async logout (userId: string) {
        return this.jwtService.deleteRefreshToken(userId)
    }

    public async createAccessTokenByRefreshToken (refreshToken: string) {

        const token = await this.jwtService.getRefreshToken(refreshToken)

        if(!token){
            throw HttpException.BadRequest('Refresh token not found')
        }

        const decodedData = this.jwtService.decodeRefreshToken(refreshToken)

        const accessToken = this.jwtService.generateAccessToken(decodedData.id)

        return {
            refreshToken, accessToken
        }
    }

    private async hashPassword (password: string) {
        return await bcrypt.hash(password, 7)
    }

    private async compare (password: string, hashPassword: string){
        return await bcrypt.compare(password, hashPassword)
    }

}

export const authService = new AuthService(userService, jwtService)
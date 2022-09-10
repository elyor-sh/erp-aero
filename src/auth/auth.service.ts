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
            throw new HttpException(400, 'User not found')
        }

        const isValidPass = await this.compare(params.password, user.password)

        if(!isValidPass){
            throw new HttpException(400, 'Invalid password')
        }

        const {refresh_token} = await this.jwtService.getRefreshTokenByUserId(params.id)

        const accessToken = this.jwtService.generateAccessToken(params.id)

        return {
            user: {id: user.id}, refreshToken: refresh_token, accessToken
        }
    }

    public async register (params: UserCreateDto) {
       const candidate = await this.userService.getOne(params.id)

        if(candidate){
            throw new HttpException(400, 'User not found')
        }

        const hashedPassword = await this.hashPassword(params.password)

        await this.userService.create({id: params.id, password: hashedPassword})

        const refreshToken = await this.jwtService.createRefreshToken(params.id)
        const accessToken = this.jwtService.generateAccessToken(params.id)

        return {
            refreshToken, accessToken
        }
    }

    async logout (userId: string) {
        return this.jwtService.deleteRefreshToken(userId)
    }

    private async hashPassword (password: string) {
        return await bcrypt.hash(password, 7)
    }

    private async compare (password: string, hashPassword: string){
        return await bcrypt.compare(password, hashPassword)
    }

}

export const authService = new AuthService(userService, jwtService)
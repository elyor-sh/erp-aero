import {QueryBuilder} from "../database/query-builder";
import {UserModel} from "./user.model";
import {UserCreateDto} from "./user.dto";


export class UserService {

    constructor(private readonly userRepository: QueryBuilder) {}

    async getAll (): Promise<UserModel[]> {
           return this.userRepository.find<UserModel[]>()
    }

    async getOne (id: string, columns: string = '*'): Promise<UserModel> {
       return this.userRepository.findOne<UserModel>({id}, columns)
    }

    async create (params: UserCreateDto): Promise<UserModel> {
        await this.userRepository.create(params)

        return this.userRepository.findOne<UserModel>({id: params.id})
    }

}

export const userService = new UserService(new QueryBuilder('users'))
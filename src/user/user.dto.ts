import {IsString, MinLength, Validate} from 'class-validator';
import {ValidatePhoneOrMail} from "../utils/custom-validation";

export class UserCreateDto {

    @IsString()
    @MinLength(3, {message: 'The minimum length of a phone number or email must be at least 3 characters'})
    @Validate(ValidatePhoneOrMail)
    public id: string;

    @IsString()
    @MinLength(5, {message: 'The minimum password length must be at least 5 characters'})
    public password: string;

}
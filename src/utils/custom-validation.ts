import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    isEmail,
    isPhoneNumber
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class ValidatePhoneOrMail implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        return isEmail(text) || isPhoneNumber(text)
    }

    defaultMessage(args: ValidationArguments) {
        return 'Не валидный email или номер телефона'
    }
}
import { InvalidParamError } from '~/presentation/errors'
import { EmailValidator } from '~/presentation/protocols/email-validator'
import { Validation } from '../../protocols/validation'

export class EmailValidation implements Validation {
  private readonly fieldName: string
  private readonly emailValidator: EmailValidator

  constructor (fieldName: string, emailValidator: EmailValidator) {
    this.fieldName = fieldName
    this.emailValidator = emailValidator
  }

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    console.log(isValid)
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}

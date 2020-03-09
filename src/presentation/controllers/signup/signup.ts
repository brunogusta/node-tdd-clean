import { AddAccount } from '~/domain/user-cases/add-account'
import { InvalidParamError } from '~/presentation/errors'
import { badRequest, ok, serverError } from '~/presentation/helpers'
import { Validation } from '~/presentation/helpers/validators/validation'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from './signup-protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (
    emailValidator: EmailValidator,
    addAccount: AddAccount,
    validation: Validation
  ) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, password, email } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (e) {
      // console.error(e)
      return serverError(e)
    }
  }
}

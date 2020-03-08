import { AddAccount } from '~/domain/user-cases/add-account'
import { InvalidParamError, MissingParamError } from '~/presentation/errors'
import { badRequest, ok, serverError } from '~/presentation/helpers'
import { Valitadion } from '~/presentation/helpers/validators/validation'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from './signup-protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validation: Valitadion

  constructor (emailValidator: EmailValidator, addAccount: AddAccount, validation: Valitadion) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body)
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, passwordConfirmation, password, email } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

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

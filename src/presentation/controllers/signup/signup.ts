import { AddAccount } from '~/domain/user-cases/protocols/add-account'
import { badRequest, ok, serverError } from '~/presentation/helpers'
import { Validation } from '~/presentation/protocols/validation'
import { Controller, HttpRequest, HttpResponse } from './signup-protocols'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (
    addAccount: AddAccount,
    validation: Validation
  ) {
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

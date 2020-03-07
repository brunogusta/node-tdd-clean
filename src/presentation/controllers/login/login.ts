import { InvalidParamError, MissingParamError } from '~/presentation/errors'
import { badRequest, serverError } from '~/presentation/helpers'
import { ok } from '~/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '~/presentation/protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email } = httRequest.body
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = await this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return await ok('login successfull')
    } catch (e) {
      // console.error(e)
      return serverError(e)
    }
  }
}

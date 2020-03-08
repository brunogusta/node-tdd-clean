import { InvalidParamError, MissingParamError } from '~/presentation/errors'
import { badRequest, ok, serverError, unauthorized } from '~/presentation/helpers/http-helper'
import { Authentication, Controller, EmailValidator, HttpRequest, HttpResponse } from './login-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httRequest.body
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const isAuthenticated = await this.authentication.auth(email, password)

      if (!isAuthenticated) {
        return unauthorized()
      }

      return ok('login successfull')
    } catch (e) {
      // console.error(e)
      return serverError(e)
    }
  }
}

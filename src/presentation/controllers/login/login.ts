import { MissingParamError } from '~/presentation/errors'
import { badRequest, serverError } from '~/presentation/helpers'
import { ok } from '~/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '~/presentation/protocols'

export class LoginController implements Controller {
  async handle (httRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      return await ok('login successfull')
    } catch (e) {
      // console.error(e)
      return serverError(e)
    }
  }
}

import { Controller, HttpRequest, HttpResponse } from '~/presentation/protocols'

export class LoginController implements Controller {
  async handle (httRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise(resolve => resolve({ statusCode: 400, body: 'email not provided' }))
  }
}

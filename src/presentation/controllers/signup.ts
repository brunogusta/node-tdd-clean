import { MissingParamError } from '../errors/missingParamError'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httRequest: HttpRequest): HttpResponse {
    if (!httRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
  }
}

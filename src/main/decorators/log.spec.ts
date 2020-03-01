import { Controller, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogControllerDecorator', () => {
  test('Should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle (): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          statusCode: 200,
          body: {
            name: 'Bruno'
          }
        }
        return new Promise(resolve => resolve(httpResponse))
      }
    }
    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})

import { MissingParamError } from '~/presentation/errors'
import { badRequest, ok } from '~/presentation/helpers'
import { LoginController } from './login'

const makeSut = (): LoginController => {
  return new LoginController()
}

describe('Login Controller', () => {
  test('Should return 400 if no email is  provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})

describe('Login Controller', () => {
  test('Should return 400 if no password is  provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})

describe('Login Controller', () => {
  test('Should return 200 if all informations are passed', async () => {
    const sut = makeSut()
    const fakeRequest = {
      body: {
        email: 'any_email',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(ok('login successfull'))
  })
})

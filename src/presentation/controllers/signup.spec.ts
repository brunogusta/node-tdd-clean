import { MissingParamError } from '../errors/missing-param-error'
import { SignUpController } from './signup'

const makeSut = (): SignUpController => {
  return new SignUpController()
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = makeSut()
    const httRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httResponse = sut.handle(httRequest)
    expect(httResponse.statusCode).toBe(400)
    expect(httResponse.body).toEqual(new MissingParamError('name'))
  })
})

describe('SignUp Controller', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = makeSut()
    const httRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httResponse = sut.handle(httRequest)
    expect(httResponse.statusCode).toBe(400)
    expect(httResponse.body).toEqual(new MissingParamError('email'))
  })
})

describe('SignUp Controller', () => {
  test('Should return 400 if no password is provided', () => {
    const sut = makeSut()
    const httRequest = {
      body: {
        email: 'any_email',
        name: 'any_name',
        passwordConfirmation: 'any_password'
      }
    }
    const httResponse = sut.handle(httRequest)
    expect(httResponse.statusCode).toBe(400)
    expect(httResponse.body).toEqual(new MissingParamError('password'))
  })
})

describe('SignUp Controller', () => {
  test('Should return 400 if no password confirmation is provided', () => {
    const sut = makeSut()
    const httRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        name: 'any_name'
      }
    }
    const httResponse = sut.handle(httRequest)
    expect(httResponse.statusCode).toBe(400)
    expect(httResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
})

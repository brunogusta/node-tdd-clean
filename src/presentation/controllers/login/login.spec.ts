import { LoginController } from './login'

const makeSut = (): LoginController => {
  return new LoginController()
}

describe('Login Controller', () => {
  test('Should return 400 if no email is  provided', async () => {
    const sut = makeSut()
    const fakeRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})

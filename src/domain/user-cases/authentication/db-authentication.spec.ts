import { LoadAccountByEmailRepository } from '~/data/protocols/db/load-account-by-email-repository'
import { AccountModel } from '~/domain/models/account'
import { DbAuthentication } from './db-authentication'

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeLoadAccountStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      const account: AccountModel = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }

      return new Promise(resolve => resolve(account))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountStub()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('MongoDb Authentication', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')

    await sut.auth({
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.auth({
      email: 'any_email@email.com',
      password: 'any_password'
    })

    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository fails', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(null)

    const accessToken = await sut.auth({
      email: 'any_email@email.com',
      password: 'any_password'
    })

    expect(accessToken).toBeNull()
  })
})

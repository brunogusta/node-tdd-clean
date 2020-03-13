import { HashComparer } from '~/data/protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '~/data/protocols/db/load-account-by-email-repository'
import { Authentication, AuthenticationModel } from '../protocols/authentication'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparerStub: HashComparer

  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository, hashComparerStub: HashComparer) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparerStub = hashComparerStub
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const user = await this.loadAccountByEmailRepository.load(authentication.email)
    if (!user) {
      return null
    }

    await this.hashComparerStub.compare(authentication.password, user.password)

    return new Promise(resolve => resolve('ok'))
  }
}

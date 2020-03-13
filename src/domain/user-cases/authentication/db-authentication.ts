import { LoadAccountByEmailRepository } from '~/data/protocols/db/load-account-by-email-repository'
import { Authentication, AuthenticationModel } from '../protocols/authentication'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository

  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const user = await this.loadAccountByEmailRepository.load(authentication.email)
    if (!user) {
      return null
    }

    return new Promise(resolve => resolve('ok'))
  }
}

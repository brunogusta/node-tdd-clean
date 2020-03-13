import { AccountModel } from '~/domain/models/account'
import { AddAccountModel } from '~/domain/user-cases/protocols/add-account'

export interface AddAccountRepository {
  add (accountData: AddAccountModel): Promise<AccountModel>
}

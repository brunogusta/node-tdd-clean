import { InvalidParamError } from '~/presentation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const mekeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('CompareFieldsValidation Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = mekeSut()
    const error = sut.validate({ field: 'any_password', fieldToCompare: 'diferent_password' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = mekeSut()
    const error = sut.validate({ field: 'any_password', fieldToCompare: 'any_password' })
    expect(error).toBeFalsy()
  })
})

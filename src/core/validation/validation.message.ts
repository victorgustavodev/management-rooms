import {
  BadRequestException,
  INestApplication,
  ValidationPipe
} from '@nestjs/common'
import { getMetadataStorage } from 'class-validator'
import { ValidationUtils } from 'class-validator/cjs/validation/ValidationUtils'

export const errorMessages = {
  arrayContains: 'o campo $property deve conter $constraint1 valores',
  arrayMaxSize:
    'o campo $property deve conter no máximo $constraint1 elementos',
  arrayMinSize:
    'o campo $property deve conter pelo menos $constraint1 elementos',
  arrayNotContains: 'o campo $property não deve conter $constraint1 valores',
  arrayNotEmpty: 'o campo $property não deve estar vazio',
  contains: 'o campo $property deve conter a string $constraint1',
  equals: 'o campo $property deve ser igual a $constraint1',
  isAlpha: 'o campo $property deve conter apenas letras (a-zA-Z)',
  isAlphanumeric: 'o campo $property deve conter apenas letras e números',
  isArray: 'o campo $property deve ser um array',
  isAscii: 'o campo $property deve conter apenas caracteres ASCII',
  isBIC: 'o campo $property deve ser um código BIC ou SWIFT',
  isBase32: 'o campo $property deve estar codificado no formato base32',
  isBase58: 'o campo $property deve estar codificado no formato base58',
  isBase64: 'o campo $property deve estar codificado no formato base64',
  isBoolean: 'o campo $property deve ser um valor booleano',
  isBooleanString:
    'o campo $property deve ser uma string que representa um valor booleano',
  isBtcAddress: 'o campo $property deve ser um endereço BTC',
  isCreditCard: 'o campo $property deve ser um cartão de crédito',
  isCurrency: 'o campo $property deve ser uma moeda',
  isDataURI: 'o campo $property deve estar no formato data URI',
  isDate: 'o campo $property deve ser uma instância de Date',
  isDateString:
    'o campo $property deve ser uma string de data válida no formato ISO 8601',
  isDecimal: 'o campo $property não é um número decimal válido',
  isDefined: 'o campo $property não deve ser null ou undefined',
  isDivisibleBy: 'o campo $property deve ser divisível por $constraint1',
  isEAN: 'o campo $property deve ser um EAN (código de artigo europeu)',
  isEmail: 'o campo $property deve ser um endereço de email',
  isEmpty: 'o campo $property deve estar vazio',
  isEnum: 'o campo $property deve ser um dos seguintes valores: $constraint2',
  isEthereumAddress: 'o campo $property deve ser um endereço Ethereum',
  isFQDN: 'o campo $property deve ser um nome de domínio válido',
  isFirebasePushId: 'o campo $property deve ser um identificador Firebase Push',
  isFullWidth: 'o campo $property deve conter caracteres de largura total',
  isHSL: 'o campo $property deve ser uma cor no formato HSL',
  isHalfWidth: 'o campo $property deve conter caracteres de meia largura',
  isHash: 'o campo $property deve ser um hash do tipo $constraint1',
  isHexColor: 'o campo $property deve ser uma cor hexadecimal',
  isHexadecimal: 'o campo $property deve ser um número hexadecimal',
  isIBAN: 'o campo $property deve ser um IBAN',
  isIP: 'o campo $property deve ser um endereço IP',
  isISBN: 'o campo $property deve ser um ISBN',
  isISIN: 'o campo $property deve ser um ISIN (identificador de título/ação)',
  isISO4217CurrencyCode:
    'o campo $property deve ser um código de moeda ISO4217 válido',
  isISO8601:
    'o campo $property deve ser uma string de data válida no formato ISO 8601',
  isISO31661Alpha2:
    'o campo $property deve ser um código ISO31661 Alpha2 válido',
  isISO31661Alpha3:
    'o campo $property deve ser um código ISO31661 Alpha3 válido',
  isISRC: 'o campo $property deve ser um ISRC',
  isISSN: 'o campo $property deve ser um ISSN',
  isIdentityCard:
    'o campo $property deve ser um número de documento de identidade',
  isIn: 'o campo $property deve ser um dos seguintes valores: $constraint1',
  isInt: 'o campo $property deve ser um número inteiro',
  isJSON: 'o campo $property deve ser uma string JSON',
  isJWT: 'o campo $property deve ser uma string JWT',
  isLatLong: 'o campo $property deve ser uma string de latitude e longitude',
  isLatitude: 'o campo $property deve ser uma string ou número de latitude',
  isLocale: 'o campo $property deve ser uma localidade',
  isLongitude: 'o campo $property deve ser uma string ou número de longitude',
  isLowercase: 'o campo $property deve ser uma string em minúsculas',
  isMacAddress: 'o campo $property deve ser um endereço MAC',
  isMagnetURI: 'o campo $property deve estar no formato magnet URI',
  isMilitaryTime:
    'o campo $property deve ser uma representação de hora militar válida no formato HH:MM',
  isMimeType: 'o campo $property deve ser um tipo MIME válido',
  isMobilePhone: 'o campo $property deve ser um número de telefone válido',
  isMongoId: 'o campo $property deve ser um identificador MongoDB',
  isMultibyte: 'o campo $property deve conter um ou mais caracteres multibyte',
  isNegative: 'o campo $property deve ser um número negativo',
  isNotEmpty: 'o campo $property não deve estar vazio',
  isNotEmptyObject: 'o campo $property deve ser um objeto não vazio',
  isNotIn:
    'o campo $property não deve ser um dos seguintes valores: $constraint1',
  isNumber:
    'o campo $property deve ser um número que atenda às restrições especificadas',
  isNumberString: 'o campo $property deve ser uma string numérica',
  isObject: 'o campo $property deve ser um objeto',
  isOctal: 'o campo $property deve ser um número octal válido',
  isPassportNumber: 'o campo $property deve ser um número de passaporte válido',
  isPhoneNumber: 'o campo $property deve ser um número de telefone válido',
  isPort: 'o campo $property deve ser uma porta',
  isPositive: 'o campo $property deve ser um número positivo',
  isPostalCode: 'o campo $property deve ser um código postal',
  isRFC3339: 'o campo $property deve ser uma data no formato RFC 3339',
  isRgbColor: 'o campo $property deve ser uma cor RGB',
  isSemVer:
    'o campo $property deve estar em conformidade com a especificação de versionamento semântico',
  isString: 'o campo $property deve ser uma string',
  isStrongPassword: 'o campo $property não é seguro o suficiente',
  isSurrogatePair:
    'o campo $property deve conter qualquer caractere de par substituto',
  isTaxId: 'o campo $property deve ser um número de identificação fiscal',
  isTimeZone: 'o campo $property deve ser um fuso horário IANA válido',
  isUppercase: 'o campo $property deve ser uma string em maiúsculas',
  isUrl: 'o campo $property deve ser um URL',
  isUuid: 'o campo $property deve ser um UUID',
  isVariableWidth:
    'o campo $property deve conter caracteres de largura total e meia largura',
  matches:
    'o campo $property deve corresponder à expressão regular $constraint1',
  max: 'o campo $property não deve ser maior que $constraint1',
  maxDate: 'a data máxima para o campo $property é $constraint1',
  maxLength: 'o campo $property deve ter no máximo $constraint1 caracteres',
  min: 'o campo $property não deve ser menor que $constraint1',
  minDate: 'a data mínima permitida para o campo $property é $constraint1',
  minLength: 'o campo $property deve ter no mínimo $constraint1 caracteres',
  notContains: 'o campo $property não deve conter a string $constraint1',
  notEquals: 'o campo $property não deve ser igual a $constraint1',
  isLength:
    'o campo $property deve ter entre $constraint1 e $constraint2 caracteres'
}

export const propertyNames = {
  token: 'token com informações do cartão',
  paymentMethod: 'método de pagamento',
  issuerId: 'identificador do emissor',
  email: 'endereço de e-mail',
  name: 'nome',
  description: 'descrição',
  address: 'endereço',
  cityID: 'identificador da cidade',
  categoryID: 'identificador da categoria',
  title: 'título',
  body: 'corpo da mensagem',
  state: 'estado',
  password: 'senha',
  cpf: 'cpf',
  phone: 'telefone',
  acceptReceiveNotifications: 'aceita receber notificações',
  refreshToken: 'token de atualização',
  user: 'email ou cpf',
  expirationDate: 'data de expiração',
  redemptionType: 'tipo de resgate',
  amount: 'valor',
  plan: 'plano',
  duration: 'duração',
  beneficiaries: 'beneficiários',
  cancelFeePercent: 'percentual de multa por cancelamento'
}

function convertImageErrorMessage(message) {
  const isImageValidationError = message.includes('image')
  if (isImageValidationError) {
    return `O campo "imagem" precisa ser do tipo JPG, JPEG ou PNG`
  }
  const isSizeValidationError = message.includes('size')
  if (isSizeValidationError) {
    return `O campo "imagem" precisa ter no máximo 3MB`
  }
  return message
}

export function exceptionFactory(errors) {
  if (typeof errors === 'string') {
    errors = convertImageErrorMessage(errors)
    return new BadRequestException(errors)
  }
  const error = errors[0]
  const constraints = error?.constraints || {}
  const constraintError = Object.keys(constraints)[0]
  const validationMetas = getMetadataStorage().getTargetValidationMetadatas(
    error.target.constructor,
    error.target.constructor.name,
    true,
    false
  )
  const validationMeta = validationMetas.find(
    (meta) =>
      meta.propertyName === error.property && meta.name === constraintError
  )
  const validationArguments = {
    targetName: error.target.constructor.name,
    property: `"${propertyNames[error.property] || error.property}"`,
    value: error.value,
    constraints: validationMeta?.constraints || []
  }
  let message = ''
  if (constraints?.cpfValidate) {
    message = constraints?.cpfValidate
  } else if (constraints?.cpfOrEmailValidate) {
    message = constraints?.cpfOrEmailValidate
  } else {
    message =
      ValidationUtils.replaceMessageSpecialTokens(
        errorMessages[Object.keys(error.constraints)[0]],
        validationArguments
      ) || 'Erro de validação'
  }
  return new BadRequestException(message)
}

export function setCustomValidationPipe(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        value: true
      },
      exceptionFactory
    })
  )
}

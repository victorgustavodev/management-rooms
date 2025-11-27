import { ApiResponseOptions } from '@nestjs/swagger'
import { RESPONSE } from './response.messages'

const errors = [
  { status: 400, message: 'Token inválido' },
  { status: 401, message: 'Usuário não autenticado' },
  { status: 403, message: 'Usuário não autorizado' },
  { status: 404, message: 'Recurso não encontrado' },
  { status: 409, message: 'Conflito de dados' },
  { status: 429, message: 'Muitas requisições' },
  { status: 500, message: 'Erro interno do servidor' }
]

const defaultErrorsResponse: ApiResponseOptions[] = errors.map((error) => {
  return {
    status: error.status,

    schema: {
      example: {
        statusCode: error.status,
        message: error.message,
        timestamp: '2025-01-11T17:09:53.713Z',
        error: error.message
      }
    }
  }
})

export function getResponseExamples(id): ApiResponseOptions[] {
  const response: ApiResponseOptions = {
    status: 200,
    schema: {
      example: {
        message: RESPONSE.EXAMPLE(id),
        data: {}
      }
    }
  }
  // @TODO fazer exemplos detalhados de acordo com o id dos métodos do controller
  return [response, ...defaultErrorsResponse]
}

import { applyDecorators } from '@nestjs/common'
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger'

export function ApiResponses(responses: ApiResponseOptions[]) {
  return applyDecorators(...responses.map((response) => ApiResponse(response)))
}

import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import basicAuth from 'express-basic-auth'

const SWAGGER_DOCS_USER = process.env.SWAGGER_DOCS_USER as string
const SWAGGER_DOCS_PASSWORD = process.env.SWAGGER_DOCS_PASSWORD as string

export function swaggerConfig(app: INestApplication) {
  app.use(
    '/api/docs',
    basicAuth({
      challenge: true,
      users: {
        [SWAGGER_DOCS_USER]: SWAGGER_DOCS_PASSWORD
      }
    })
  )

  const config = new DocumentBuilder()
    .setTitle('TEMPLATE API')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'api-key',
        in: 'header'
      },
      'Api-Key'
    )
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'TEMPLATE API',
    swaggerOptions: {
      filter: true,
      showRequestDuration: true
    }
  })
}

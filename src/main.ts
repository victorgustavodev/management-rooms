// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Sistema de Reserva de Salas')
    .setDescription('API de reservas, salas, usuários e logs')
    .setVersion('1.0')
    .addBearerAuth() // Para endpoints autenticados futuramente
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // mantém o token entre requisições
    },
  });

  await app.listen(3000);
  console.log(`🚀 API rodando em: http://localhost:3000`);
  console.log(`📘 Swagger em: http://localhost:3000/docs`);
}
bootstrap();

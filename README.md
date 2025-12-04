# Room Booking API

API para gerenciamento de salas e reservas, construída com NestJS, aplicando princípios de Clean Architecture e Domain-Driven Design (DDD), usando PostgreSQL como banco de dados e Docker para containerização.

## Visão geral

O objetivo principal desta aplicação é gerenciar:
- Salas (rooms)
- Usuários
- Reservas (bookings) de salas

A API segue uma arquitetura em camadas bem definida (domain, application/use-cases, infrastructure, interfaces) para facilitar manutenção, testes e evolução do código.

## Tecnologias

- Node.js / TypeScript
- NestJS
- PostgreSQL
- TypeORM
- Docker / Docker Compose
- Swagger (documentação da API)

## Arquitetura

A aplicação segue Clean Architecture com DDD, separando responsabilidades em camadas:

- **Domain**  
  - Entidades de domínio (`User`, `Room`, `Booking`, etc.)  
  - Regras de negócio e invariantes  
  - Interfaces de repositórios

- **Application (Use Cases)**  
  - Casos de uso como `CreateUserUseCase`, `CreateBookingUseCase`, `EditRoomUseCase`  
  - Orquestram regras de negócio e acesso aos repositórios

- **Infrastructure**  
  - Implementações dos repositórios com TypeORM  
  - Entidades TypeORM  
  - Configurações de banco, migrations, mappers (Domain ↔ Persistence)

- **Interface (HTTP)**  
  - Controllers NestJS  
  - DTOs de entrada/saída  
  - Presenters (transformam entidades de domínio em respostas HTTP)

## Funcionalidades principais

- Gerenciamento de usuários:
  - Criação, listagem, busca por ID, atualização e remoção
- Gerenciamento de salas:
  - Cadastro de salas, capacidade, andar, horários de funcionamento, status ativo/inativo
- Gerenciamento de reservas:
  - Criação de reserva de sala para um usuário
  - Controle de horário de início e fim
  - Status da reserva (`pending`, `confirmed`, `canceled`, `rejected`)
  - Suporte a recorrência (quando aplicável)

## Pré-requisitos

- Node.js (LTS)
- Docker e Docker Compose
- Yarn ou npm

## Como executar com Docker

1. Copie o arquivo de exemplo de variáveis de ambiente:
cp .env.example .env

text

Ajuste as variáveis conforme necessário (porta da API, credenciais do banco, etc.).

2. Suba os containers:
docker-compose up -d --build

text

3. A API deverá estar disponível em:

- `http://localhost:<PORT>` (por padrão, 3000)

## Como executar localmente (sem Docker)

1. Instale as dependências:

yarn install

ou
npm install

text

2. Configure o banco PostgreSQL localmente e ajuste o `.env`.

3. Rode as migrations:

yarn typeorm migration:run

ou
npm run typeorm migration:run

text

4. Inicie a aplicação:

yarn start:dev

ou
npm run start:dev

text

## Documentação da API

A documentação Swagger é exposta em:

http://localhost:<PORT>/api

text

Lá você encontra os endpoints para gerenciamento de usuários, salas e reservas, com exemplos de requisição e resposta.

## Estrutura de pastas (exemplo)

src/
core/
entities/
mappers/
response/
tokens/
domain/
entities/
repositories/
infra/
database/
typeorm/
entities/
mappers/
repositories/
http/
users/
dto/
use-cases/
user.controller.ts
user.presenter.ts
rooms/
bookings/
main.ts

text

## Testes

Execute a suíte de testes com:

yarn test

ou
npm test

text

## Licença

Este projeto pode ser adaptado para o modelo de licença que você preferir (MIT, Apache-2.0, etc.). Atualize esta seção conforme a licença adotada.
# README

## Sobre a aplicação

A aplicação é uma plataforma para gerenciamento de esmpresas, permitindo que o usuário crie, edite e delete empresas, além de controlar os locais que essa empresa possui.
Esta aplicação foi desenvolvida para realizar o teste de Desenolvedor FullStack Jr na HubLocal.

# Sobre o BackEnd

Esta aplicação é um backend criado com NestJS como ferramenta principal e várias bibliotecas e ferramentas para construir uma API eficiente e segura. A aplicação utiliza o Prisma como ORM para interagir com o banco de dados PostgreSQL. Além disso, utiliza JWT para autenticação dos usuários e class-validator para a validação dos campos recebidos nas rotas. A documentação da API é feita através do Swagger e os testes são feitos utilizando o JEST.

### O BackEnd está disponível em https://hublocal-teste-api.onrender.com/docs

## Como executar a aplicação

Para executar a aplicação localmente, você precisará ter o Node.js e o PostgreSQL instalados em seu computador. Em seguida, siga as etapas abaixo:

1. Clone o repositório para o seu computador
2. Navegue até a pasta do backend em seu terminal
3. Execute o comando `npm install` para instalar as dependências do projeto
4. Inicie um banco de dados Postgres para a aplicação
5. Configure as variáveis de ambiente de acordo com o arquivo `.env.example`
6. Execute o comando `npm run start:dev` para iniciar a aplicação em modo de desenvolvimento
7. A API estará disponível em http://localhost:3333
8. A documentação estará disponível em http://localhost:3333/docs

## Tecnologias utilizadas

- NestJS
- Prisma
- PostgreSQL
- JWT
- class-validator
- Swagger
- JEST

# Sobre o FrontEnd

Esta aplicação é uma frontend criado com ReactJS utilizando Typescript e várias bibliotecas e ferramentas para construir uma experiência de usuário eficiente e agradável. A aplicação utiliza Styled Components e Material UI para estilização, React Router DOM para controle de rotas, React Hook Form para controle de formulários, Axios para consultas a API, ContextAPI e LocalStorage para controle de estado e persistência, react-toastify para feedback visual de consultas a API, ZOD para validação de formulários e React Spring para animações.

### O FrontEnd está disponível em https://hublocal-teste-frontend.onrender.com/

## Como executar a aplicação

Para executar a aplicação localmente, você precisará ter o Node.js instalado em seu computador. Em seguida, siga as etapas abaixo:

1. Clone o repositório para o seu computador
2. Navegue até a pasta do frontend em seu terminal
3. Execute o comando `npm install` para instalar as dependências do projeto
4. Configure as variáveis de ambiente de acordo com o arquivo `.env.example`
4. Execute o comando `npm run dev` para iniciar a aplicação
5. A aplicação estará disponível em http://localhost:5173

## Tecnologias utilizadas

- ReactJS
- Typescript
- Styled Components
- Material UI
- React Router DOM
- React Hook Form
- Axios
- ContextAPI
- LocalStorage
- react-toastify
- ZOD
- React Spring

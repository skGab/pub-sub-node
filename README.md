# Projeto Pub/Sub

## Instalação de dependencias

Após baixar o projeto, você precisa instalar as dependências necessárias:

`npm install`

## Rodando Local

Para iniciar a aplicação em um ambiente de desenvolvimento:

`npm run dev`

Isso inicia o servidor em `localhost` na porta `3000`.

## Testando a aplicação

Para testar a rota, envie uma solicitação POST para `http://localhost:3000/channel1` com um payload JSON. Verificar o console após request.

## Rodando testes

Antes de executar os testes, é necessário buildar o projeto:

`npm run build`

Em seguida é só rodar o comando no arquivo selecionado, partindo do root da aplicação:

`node tests/<file_name>.test.mjs`

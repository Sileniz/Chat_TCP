# Servidor socket feito em Node.js utilizando TypeScript.

## Descrição

Este projeto é um servidor socket simples que permite comunicação via TCP. O servidor é implementado em TypeScript. Utilizando criptografia simétrica AES-256 para a segurança dos dados transmitidos.

## Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Sockets

## Configuração do ambiente

1. Clone o repositório:

    ```bash
    git clone https://github.com/Sileniz/chat_tcp.git
    cd chat_tcp
    ```

2. Crie um arquivo `.env` para configurar as variáveis de ambiente. Você pode usar o arquivo `.env.example` como base:

    ```bash
    cp .env.example .env
    ```

3. Abra o arquivo `.env` e adicione uma chave e um vetor de inicialização. Você pode gerar esses valores com os seguintes comandos:

    ```bash
    # Gerar uma chave de 256 bits (32 bytes)
    openssl rand -hex 32

    # Gerar um vetor de inicialização de 128 bits (16 bytes)
    openssl rand -hex 16
    ```

4. Atualize o arquivo `.env` com os valores gerados:

    ```plaintext
    KEY=YOUR_GENERATED_256_BIT_KEY
    IV=YOUR_GENERATED_128_BIT_IV
    ```
## Instalação

1. Instale as dependências do projeto:

    ```bash
    npm install
    ```
2. Executando o servidor
    ```bash
    npm run dev
    ```

3. Executando o cliente
    ```bash
    npm run test
<br></br>
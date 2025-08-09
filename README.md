# API Rest - Automação de Testes na Camada de Serviço

Esta API foi desenvolvida em Javascript com Express para fins de aprendizado de testes e automação na camada de API.

## Funcionalidades
- Registro de usuário
- Login de usuário
- Consulta de usuários
- Transferência de valores entre usuários
- Documentação Swagger disponível via endpoint

## Regras de Negócio
1. Login e senha obrigatórios para autenticação.
2. Não é permitido registrar usuários duplicados.
3. Transferências para destinatários não favorecidos só podem ser realizadas se o valor for menor que R$ 5.000,00.

## Estrutura do Projeto
- `controller/` - Lógica dos endpoints
- `service/` - Regras de negócio
- `model/` - Modelos de dados em memória
- `app.js` - Configuração do Express e rotas
- `server.js` - Inicialização do servidor

## Instalação e Execução
1. Instale as dependências:
   ```zsh
   npm install
   ```
2. Inicie o servidor:
   ```zsh
   npm start
   ```
3. Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Testes
- O arquivo `app.js` pode ser importado para testes automatizados com Supertest.

---

> Projeto para fins didáticos. Banco de dados em memória (os dados são perdidos ao reiniciar o servidor).

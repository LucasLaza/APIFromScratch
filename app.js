const express = require('express');
const userController = require('./controller/userController');
const transferController = require('./controller/transferController');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Testes de Serviço',
      version: '1.0.0',
      description: 'API para automação de testes na camada de serviço.'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ]
  },
  apis: ['./controller/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/users', userController.list);
app.post('/transfer', transferController.transfer);

module.exports = app;

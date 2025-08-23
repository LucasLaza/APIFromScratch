const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../app.js');

const transferService = require('../../service/transferService')
const { users, transfers } = require('../../model/database');

describe('Transfer Controller', () => {
    describe('POST /transfer', () => {
        let token;
        let username;
        beforeEach(async () => {
            users.length = 0;
            transfers.length = 0;
            username = 'Lucas' + Date.now();
            await request(app)
                .post('/register')
                .send({ username, password: '123456', favorecidos: [] });
            const loginRes = await request(app)
                .post('/login')
                .send({ username, password: '123456' });
            token = loginRes.body.token;
        });

        afterEach(() => {
            sinon.restore();
        });

        it('Destinatário inexistente retorna 400', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: username,
                    to: "Cris",
                    value: 400
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado.')
        });

        it('Usando Mocks: Destinatário inexistente retorna 400', async () => {
            sinon.stub(transferService, 'transfer').returns({ error: 'Usuário remetente ou destinatário não encontrado.' });
            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: username,
                    to: "Cris",
                    value: 400
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado.')
        });
    })
    })

    
    describe('GET /transfers', () => {

    })

    describe('Token validation', () => {
        it('should return 401 if no token is provided', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "Lucas",
                    to: "Cris",
                    value: 400
                });
            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('error', 'Token não informado.');
        });

        it('should return 403 if token is invalid', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', 'Bearer invalidtoken')
                .send({
                    from: "Lucas",
                    to: "Cris",
                    value: 400
                });
            expect(resposta.status).to.equal(403);
            expect(resposta.body).to.have.property('error', 'Token inválido.');
        });
    });

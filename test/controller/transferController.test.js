const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../app.js');

const transferService = require('../../service/transferService')

describe('Transfer Controller', () => {
    describe('POST /transfer', () => {
        it('Destinatário inexistente retorna 400', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "Lucas",
                    to: "Cris",
                    value: 400
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado.')
        });

        it('Usando Mocks: Destinatário inexistente retorna 400', async () => {

            const transferServiceMock = sinon.stub(transferService, 'transfer')
            transferServiceMock.returns({ error: 'Usuário remetente ou destinatário não encontrado.' })
            
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "Lucas",
                    to: "Cris",
                    value: 400
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado.')

            sinon.restore();
        });
    })
    })

    
    describe('GET /transfers', () => {

    })

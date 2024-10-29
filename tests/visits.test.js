const request = require('supertest');
const { app } = require('../app');

describe('Testes do Contador de Visitas', () => {
    it('Deve retornar o número de visitas', async () => {
        const response = await request(app).get('/api/visits');
        expect(response.statusCode).toBe(200);
        expect(response.text).toMatch(/Número de visitas: (\d+|\(modo teste\))/);
    });
});

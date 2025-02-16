const request = require('supertest');
const express = require('express');
const router = require('../routes/temples');
const { getDatabase } = require('../data/database');  // Asegúrate de que esta es la función real para obtener la base de datos

// Simulamos el módulo de base de datos
jest.mock('../data/database', () => ({
    getDatabase: jest.fn().mockReturnValue({
        db: jest.fn().mockReturnValue({
            collection: jest.fn().mockReturnValue({
                find: jest.fn().mockReturnValue({
                    toArray: jest.fn().mockResolvedValue([{ NameOfTemple: 'Guatemala', CityLocation: 'Guatemala', Country: "Guatemala" }])
                })
            })
        })
    })
}));

const app = express();
app.use("/temples", router);

describe('GET /temples', () => {
    it('should return a JSON object', async () => {
        const response = await request(app).get('/temples');
        console.log(response.body); // Imprime la respuesta para depuración
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
});

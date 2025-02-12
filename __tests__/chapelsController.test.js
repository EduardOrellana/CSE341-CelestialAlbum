const request = require('supertest');
const express = require('express');
const { getAll, getSingle } = require('../controllers/chapels'); 
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

jest.mock('../data/database');

const app = express();

app.get('/chapels', getAll);
app.get('/chapels/:id', getSingle);


describe('Basic Test', () => {
    it('should pass', () => {
        expect(true).toBe(true);
    });
});

describe('GET /chapels', () => {
    it('should return a list of chapels', async () => {
        mongodb.getDatabase.mockReturnValue({
            db: () => ({
                collection: () => ({
                    find: jest.fn().mockReturnValue({ toArray: jest.fn().mockResolvedValue([{ name: 'Temple 1' }, { name: 'Temple 2' }]) })
                })
            })
        });
        
        const res = await request(app).get('/chapels');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([{ name: 'Temple 1' }, { name: 'Temple 2' }]);
    });
});

describe('GET /chapels/:id', () => {
    it('should return a single chapel', async () => {
        const mockId = new ObjectId();
        mongodb.getDatabase.mockReturnValue({
            db: () => ({
                collection: () => ({
                    find: jest.fn().mockReturnValue({ toArray: jest.fn().mockResolvedValue([{ _id: mockId, name: 'Temple 1' }]) })
                })
            })
        });
        
        const res = await request(app).get(`/chapels/${mockId}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ _id: mockId.toString(), name: 'Temple 1' });
    });
});
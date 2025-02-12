const request = require('supertest');
const express = require('express');
const { getAll, getSingle } = require('../controllers/prophets'); 
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

jest.mock('../data/database');

const app = express();
app.get('/prophets', getAll);
app.get('/prophets/:id', getSingle);
app.get('/chapels', getAll);
app.get('/chapels/:id', getSingle);

describe('Basic Test', () => {
    it('should pass', () => {
        expect(true).toBe(true);
    });
});

describe('GET /prophets', () => {
    it('should return a list of prophets', async () => {
        mongodb.getDatabase.mockReturnValue({
            db: () => ({
                collection: () => ({
                    find: jest.fn().mockReturnValue({ toArray: jest.fn().mockResolvedValue([{ name: 'Moses' }, { name: 'Elijah' }]) })
                })
            })
        });
        
        const res = await request(app).get('/prophets');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([{ name: 'Moses' }, { name: 'Elijah' }]);
    });
});

describe('GET /prophets/:id', () => {
    it('should return a single prophet', async () => {
        const mockId = new ObjectId();
        mongodb.getDatabase.mockReturnValue({
            db: () => ({
                collection: () => ({
                    find: jest.fn().mockReturnValue({ toArray: jest.fn().mockResolvedValue([{ _id: mockId, name: 'Moses' }]) })
                })
            })
        });
        
        const res = await request(app).get(`/prophets/${mockId}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ _id: mockId.toString(), name: 'Moses' });
    });
});



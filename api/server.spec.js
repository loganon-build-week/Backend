const request = require('supertest');
const server = require('./server');

describe('server', () => {
    it('db environment is testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
    describe('GET /', () => {
        it('should show a code of 200', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });

        it('should return data in json', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toMatch(/json/);
                    expect(res.type).toBy('application/json');
                });
        });

        it('should return {api: "running" as the body', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.body).toEqual({ api: 'running' });
                    expect(res.body.api).toBe('running');
                });
        });
    });
});
const request = require('supertest');
let { users } = require('../data/UsersData');
jest.mock('../data/UsersData.js');

let server;
describe('apis /user', () => {
    beforeEach(() => { server = require('../index'); });
    afterEach(() => { server.close(); });

    describe('POST', () => {
        it('should return 201', async () => {
            const res = await request(server).post('/api/user').send({
                "name": "John",
                "surname": "Doe",
                "dateOfBirth": "31/10/1985",
                "phone": "0650915074",
                "address": "103 rue de la république"
            })
            expect(res.status).toBe(201);
        })

        it('should return 400', async () => {
            const res = await request(server).post('/api/user').send({
                "name": "John"
            })
            expect(res.status).toBe(400);
        })
    })

    describe('GET', () => {
        it('should return a user if id exists', async () => {
            const user = users[0];
            const res = await request(server).get(`/api/user/${user.id}`).send()
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('John');
        })

        it('should return 404', async () => {
            const res = await request(server).get('/api/user/123').send()
            expect(res.status).toBe(404);
            expect(res.body.message).toBe('Id user 123 not found');
        })
    })

    describe('PATCH', () => {
        it('should modify user address if id exists', async () => {
            const user = users[0];
            const res = await request(server).patch(`/api/user/${user.id}`).send({ address: 'Hackney Street' })
            expect(res.status).toBe(200);
            expect(res.body.address).toBe('Hackney Street');
        })

        it('should return 404', async () => {
            const res = await request(server).patch('/api/user/123').send({ address: 'Hackney Street' })
            expect(res.status).toBe(404);
            expect(res.body.message).toBe('Id user 123 not found');
        })
    })

    describe('GET', () => {
        it('should return 200 user if id exists', async () => {
            const user = users[0];
            const res = await request(server).delete(`/api/user/${user.id}`).send();
            expect(res.status).toBe(200);
        })

        it('should return 404', async () => {
            const user = users[0];
            const res = await request(server).delete('/api/user/123').send();
            expect(res.status).toBe(404);
        })
    })
})
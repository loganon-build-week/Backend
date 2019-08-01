const db = require('../data/dbConfig');
const Users = require('./users-model');

describe('user model', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('add()', () => {
        it('should add the user into the db', async () => {
            await Users.add({ name: 'Jessie' });
            const users = await db('users');
            expect(users).toHaveLength(1);
        });
    });
});
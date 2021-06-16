const register_post = require('../controllers/userController');
const User = require('../models/user');
const db = require('./db')
beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

describe('User model', () => {
    it('has username, password and permissions level', function () {
        const newUser = new User({ username: 'test', password: '123', permission: 'Edit Permission' });
        expect(newUser.username).toEqual('test');
        expect(newUser.permission).toEqual('Edit Permission');
        expect(newUser.password).toEqual('123');
    });

    it('can save user', function (done) {
        const newUser = new User({ username: 'test', password: '123', permission: 'Edit Permission' });

        newUser.save(function (err) {
            expect(err).toBeNull();

            User.find(function (err, username) {
                expect(err).toBeNull();
                done();
            });
        })
    })

    it('can register user', async function () {
        const mockRequest = {
            body: {
                username: 'test',
                password: '123',
                permission: 'Edit Permission'
            }
        };
        const mockResponse = {
            json: jest.fn(),
            status: jest.fn(),
        };
        const req = mockRequest;
        const res = mockResponse;

        register_post(req, res);
        User.findOne({ username: 'test' });
    })
})
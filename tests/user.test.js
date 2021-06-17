const mongoose = require('mongoose');
const UserModel = require('../models/user');
const userData = { username: 'testuser', password: '123secure', permission: 'Edit Permission' };

describe('User Model Test', () => {
      afterAll(done => {
        mongoose.connection.close()
        done()
      })

    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://shoppingninja:iVPbr1fwztFbwCFC@cluster0.vsc25.mongodb.net/shopping?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save user successfully', async () => {
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.permission).toBe(userData.permission);
    });

    it('hashes password in the database, thus passwords when compared what user entered and what is stored in db should be different', async () => {
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.password).not.toEqual(userData.password);
    })    
})
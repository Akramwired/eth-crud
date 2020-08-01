const Crud = artifacts.require('Crud');

contract('Crud', () => {
    let crud = null;
    before(async () => {
        crud = await Crud.deployed();
    });
    
    it('Should create a new user', async () => {
        await crud.create('Jenna');
        const user = await crud.read(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'Jenna');
    });

    it('Should update a user', async () => {
        await crud.update(1, 'Rose');
        const user = await crud.read(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'Rose');
    });

    it('Should not update a non-existing user', async () => {
        try {
            await crud.update(2, 'Tori');
        } catch(e) {
            assert(e.message.includes('User does not exist!'));
            return;
        }
        assert(false);
    });

    it('Should destroy a user', async () => {
        await crud.destroy(1);
        try{
            await crud.read(1)
        } catch(e) {
            assert(e.message.includes('User does not exist!'));
            return;
        }
        assert(false);
    });

    it('Should not delete a non existing user', async () => {
        try{
            await crud.destroy(11);
        } catch(e) {
            assert(e.message.includes('User does not exist!'));
            return; 
        }
        assert(false);
    });
});



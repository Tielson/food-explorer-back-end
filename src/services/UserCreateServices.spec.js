const UserCreateService = require("./UserCreateService")    
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory')

it("User should be create", async () => {
    const user = {
        name: "UserTest",
        email: "fili@f.com",
        password: "123456"
    };

    const userRepositoryInMemory = new UserRepositoryInMemory()
    const userCreateService = new UserCreateService(userRepositoryInMemory)
    const userCreated = await userCreateService.execute(user)

    expect(userCreated).toHaveProperty('id');

})
class UserRepositoryInMemory {
    users = [] 

    async createUser({ name, email, password }) {
        const user = {
            id: Math.floor(Math.random() * 1000) + 1,
            name,
            email,
            password
        }
        this.users.push(user);

        return user;
    }

    async fyndByEmail(email) {
        return this.users.find(user => user.email === email)
    }
}

module.exports = UserRepositoryInMemory;
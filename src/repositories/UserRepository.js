const sqliteConnection = require("../database/sqlite")

class UserRepository {

    async fyndByEmail(email) {

        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        return user
    }

    async create({ name, email, password, isAdmin }) {

        const database = await sqliteConnection()
        const userId = await database.run("INSERT INTO users (name, email, password, isAdmin) VALUES (?,?,?,?)", [name, email, password, isAdmin])

        return { id: userId }
    }
}

module.exports = UserRepository
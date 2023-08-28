const sqliteConnection = require("../database/sqlite")

class TasksController {

  async create(req, res) {
    const { status, action, responsible, observation, customers_id, project_id } = req.body

    const database = await sqliteConnection()

    database.run(`
      INSERT INTO tasks
      (status, action, responsible, observation, customers_id, project_id) 
      VALUES (?,?,?,?,?,?)
        `, [status, action, responsible, observation, customers_id, project_id])

    return res.json()

  }

  async update(req, res) {
    const { status, id, user_id } = req.body;

    const database = await sqliteConnection();

    console.log(status, id, user_id);
    await database.run(`
      UPDATE my_order SET 
      status = ?,
      updated_at = DATETIME ('now','localtime'),
      WHERE id = ?
      AND user_id = ?
    `, [status, id, user_id]);

    return res.json();
  }
}

module.exports = TasksController
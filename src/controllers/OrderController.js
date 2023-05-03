const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class IngredientsController {

  async create(req, res) {
    const { status, detailing } = req.body
    const user_id = req.user.id

    const database = await sqliteConnection()

    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let result = [];
    
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * nums.length);
      const randomNumber = nums[randomIndex];
      result.push(randomNumber);
      nums.splice(randomIndex, 1);
    }
    const s = result.join('');
    console.log(s);

      database.run(`
      INSERT INTO my_order
      (status, code, detailing, user_id) 
      VALUES (?,?,?,?)
        `, [status, s, detailing, user_id])

      return res.json()

    }

  async update(req, res) {
      const { status, id, user_id } = req.body;

      const database = await sqliteConnection();


      await database.run(`
      UPDATE my_order SET 
      status = ?,
      updated_at = DATETIME ('now')
      WHERE id = ?
      AND user_id = ?
    `, [status, id, user_id]);

      return res.json();
    }

  async viewAll(req, res) {
      const database = await sqliteConnection()

      const notes = await database.all(`
    SELECT  * FROM  my_order 
    ORDER BY updated_at DESC
    `)

      return res.json(notes)
    }
    
  async orderNew(req, res) {
      const database = await sqliteConnection()

      const notes = await database.all(`
    SELECT  * FROM  my_order 
    WHERE status = 'Pendente'
    ORDER BY updated_at DESC
    ` )

      return res.json(notes)
    }

  async toview(req, res) {
      const user_id = req.user.id

      const database = await sqliteConnection()

      const notes = await database.all(`
      SELECT * FROM my_order 
      WHERE user_id = ?
      ORDER BY updated_at DESC


    `, [user_id])

      return res.json(notes)
    }


  }

module.exports = IngredientsController
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage');
const sqliteConnection = require("../database/sqlite")

class DishImgController {
    async update(req, res) {
        const user_id = req.user.id;
        const imgFilename = req.file.filename;


        const diskStorage = new DiskStorage()
        const database = await sqliteConnection()

        const user = await database.get(`SELECT * FROM users WHERE id = (?)`, [user_id])
        
        const selectedDish = await database.get(`SELECT id, img FROM  dishs WHERE id = (SELECT max(id)  FROM dishs)`)

        if (!user) {
            throw new AppError("Somente usuarios autenticados podem alterar o prato", 401);
        }

        if (selectedDish.img) {
            await diskStorage.deleteFile(selectedDish.img);
        }

        const filename = await diskStorage.saveFile(imgFilename);


        await database.run(`
        UPDATE dishs set
        img = ?,
        updated_at = DATETIME ('now') 
        WHERE id = ?` ,
            [filename, selectedDish.id])

        return res.json(user)
    }
    async updated(req, res) {
        const user_id = req.user.id;
        const { id } = req.params
        const imgFilename = req.file.filename;

        const diskStorage = new DiskStorage()
        const database = await sqliteConnection()

        const user = await database.get(`SELECT * FROM users WHERE id = (?)`, [user_id])


        const selectedDish = await database.get(`SELECT id, img FROM dishs WHERE id = ?`, [id]);
        console.log('selectedDish:', selectedDish);


        if (!user) {
            throw new AppError("Somente usuarios autenticados podem alterar o prato", 401);
        }

        if (!selectedDish) {
            throw new AppError("Prato não encontrado", 404);
        }

        if (selectedDish.img) {
            await diskStorage.deleteFile(selectedDish.img);
        }

        console.log(imgFilename)
        const filename = await diskStorage.saveFile(imgFilename);
        console.log('filename:', filename);

        const result = await database.run(`
        UPDATE dishs set
        img = ?,
        updated_at = DATETIME ('now') 
        WHERE id = ?`,
            [filename, selectedDish.id]);
        console.log('result:', result);

        const updatedDish = await database.get(`SELECT * FROM dishs WHERE id = ?`, [selectedDish.id]);
        console.log('updated dish:', updatedDish)

        return res.json(user)
    }
}

module.exports = DishImgController
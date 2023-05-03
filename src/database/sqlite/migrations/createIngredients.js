const createIngredients = `
  CREATE TABLE IF NOT EXISTS ingredients (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
  	dish_id INTEGER, 
  	user_id INTEGER, 
  	name VARCHAR, 
	FOREIGN KEY (user_id) REFERENCES users(id),
  	FOREIGN KEY (dish_id) REFERENCES dishs(id)
	ON DELETE CASCADE
  )
`;



module.exports = createIngredients
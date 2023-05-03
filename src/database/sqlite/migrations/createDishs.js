const createDishs = `
  CREATE TABLE IF NOT EXISTS dishs (
	  id INTEGER PRIMARY KEY AUTOINCREMENT,
	  name VARCHAR,
	  category VARCHAR,
	  price INTEGER, 
	  description VARCHAR, 
	  img VARCHAR NULL, 
	  user_id INTEGER, 
	  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  FOREIGN KEY(user_id) REFERENCES users(id)
)
`
;

module.exports = createDishs
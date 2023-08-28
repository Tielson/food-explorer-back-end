const createProject =  `CREATE TABLE IF NOT EXISTS projects(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" VARCHAR,
    "term" VARCHAR,
    "customers_id" INTEGER,
    "created_at" TIMESTAMP DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
		"updated_at" TIMESTAMP DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    FOREIGN KEY (customers_id) REFERENCES customers(id)
  )`;
  module.exports = createProject
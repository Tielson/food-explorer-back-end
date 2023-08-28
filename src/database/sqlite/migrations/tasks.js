const createTasks = `
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status VARCHAR,
    action VARCHAR, 
    responsible VARCHAR, 
    observation VARCHAR, 
    project_id INTEGER, 
    customers_id INTEGER, 
    "created_at" TIMESTAMP DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
		"updated_at" TIMESTAMP DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    FOREIGN KEY (customers_id) REFERENCES customers(id),
    FOREIGN KEY (project_id) REFERENCES project(id)
  )
`;

module.exports = createTasks;
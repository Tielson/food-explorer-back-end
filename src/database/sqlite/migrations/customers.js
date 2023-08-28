const createCustomers = `
  CREATE TABLE IF NOT EXISTS customers (
	  id INTEGER PRIMARY KEY AUTOINCREMENT,
	  name_company VARCHAR,
	  representative VARCHAR,
	  cnpj INTEGER, 
	  social_reason INTEGER, 
	  img VARCHAR NULL, 
		whatsapp INTERGER,
		"created_at" TIMESTAMP DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
		"updated_at" TIMESTAMP DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
)
`
;

module.exports = createCustomers
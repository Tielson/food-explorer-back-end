const createOrder =  `CREATE TABLE IF NOT EXISTS "order" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "status" VARCHAR,
    "code" VARCHAR,
    "detailing" VARCHAR,
    "user_id" INTEGER,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY("user_id") REFERENCES "users"("id")
  )`;
  module.exports = createOrder
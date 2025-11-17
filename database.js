const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "psql 'postgresql://neondb_owner:npg_JhiMVmCxE3s4@ep-wandering-snow-acjl8q5m-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'",
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;

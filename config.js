const env = process.env;

const config = {
  db: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    // connectionString: `postgres://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}?sslmode=require`
    ssl: {
        rejectUnauthorized: false
    }
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
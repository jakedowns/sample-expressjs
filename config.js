const env = process.env;

const base_db =
  env.DATABASE_URL && env.DATABASE_URL.length
    ? {
        connectionString: `${env.DATABASE_URL}`,
      }
    : {
        host: env.DB_HOST,
        port: env.DB_PORT,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        // connectionString: `postgres://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}?sslmode=require`
      };

const config = {
  db: {
    ...{
      ssl: {
        rejectUnauthorized: false,
      },
    },
    ...base_db,
  },

  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;

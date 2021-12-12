const env = process.env;
const { parse } = require('pg-connection-string')

function getEnvDBConfig(){

  // ENV: DO
  if(env.DATABASE_URL && env.DATABASE_URL.length){
    // using connectionString overrides config.ssl
    // attempting to fix by using config parser
    // via https://help.heroku.com/MDM23G46/why-am-i-getting-an-error-when-i-upgrade-to-pg-8
    const config = parse(process.env.DATABASE_URL)
    config.ssl = {
      rejectUnauthorized: false
    }
    return config;
  }

  // ENV: local development
  return {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    // connectionString: `postgres://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}?sslmode=require`
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const DB_CONFIG = getEnvDBConfig()

const config = {
  db: DB_CONFIG,

  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;

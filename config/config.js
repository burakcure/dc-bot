const initializeDiscordConfig = () => {
  const dotenv = require("dotenv");
  const path = require("path");
  dotenv.config({ path: require("find-config")("../.env") });

  if (process.env.token === undefined) {
    console.error("Token is not set correctly!");
  }
  if (process.env.prefix === undefined) {
    console.error("Prefix is not set correctly!");
  }
  const cfg = {
    discord: {
      token: process.env.token,
      prefix: process.env.prefix,
    },
  };
  return cfg;
};
const initializeDatabaseConfig = () => {
  const dotenv = require("dotenv");
  const path = require("path");
  dotenv.config({ path: require("find-config")("../.env") });

  if (process.env.connectionString === undefined) {
    console.error("Database string is not set correctly!");
  }

  return process.env.connectionString;
};

module.exports.initializeDiscordConfig = initializeDiscordConfig;
module.exports.initializeDatabaseConfig = initializeDatabaseConfig;

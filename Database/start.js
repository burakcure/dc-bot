const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config").initializeDatabaseConfig();
let isSyncNeeded = false;
let CustomCommand = {
  GuildID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  OwnerID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CommandName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CommandType: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  CommandLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

const oldFileSync = async (db) => {
  const commandList = require("../customCommand.json");
  const keys = Object.keys(commandList);
  keys.forEach(async (element) => {
    await db.models.customCommands.create({
      GuildID: element.substring(0, 18),
      OwnerID: element.substring(element.length - 18, element.length),
      CommandName: element.substring(18, element.length - 18),
      CommandType: commandList[element].Type,
      CommandLink: commandList[element].Link,
    });
  });
};

const start = async () => {
  const db = new Sequelize(config, { logging: false });

  db.define("customCommands", CustomCommand, {});

  try {
    await db.authenticate();
    await db.sync({ force: false, logging: false });
    if (isSyncNeeded) {
      oldFileSync(db);
    }

    console.log("Connection has been established successfully.");

    return db;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit();
  }
};

exports.start = start;

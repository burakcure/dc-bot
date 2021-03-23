const bot = require("./bot/start");
const database = require("./Database/start");

process.stdin.resume();
function exitHandler(options, exitCode) {
  bot.stop();
}

process.on("exit", exitHandler.bind(null, { cleanup: true }));
process.on("SIGINT", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));
process.on("uncaughtException", exitHandler.bind(null, { exit: true }));

startServices();

async function startServices() {
  const databaseObject = await database.start();
  bot.start(databaseObject.models.customCommands);
}

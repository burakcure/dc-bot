const Discord = require('discord.js')
const { debug } = require('console')
const { Player } = require("discord-player")
const config = require("../config/config").initializeDiscordConfig()

const commands=require('./commands.js')
const { initCommands } = require('./commands.js')
const client = new Discord.Client()
player = new Player(client);//
client.player = player;
var database;



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})


client.on('message', message => {
    if (message.content[0] == config.discord.prefix) {

        commands.commandProcess(message, client,database);
    }
})



const start = async (db) => {
    
    database=db

    console.log(config.discord.token);
    commands.cooldown();
    client.login(config.discord.token);

}

const stop = () => {

      
}

exports.start = start;
exports.stop = stop;






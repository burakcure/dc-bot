const Discord = require('discord.js')
const { debug } = require('console')
const { Player } = require("discord-player")
const config = require("../config/config").initializeDiscordConfig()
const commands=require('./commands.js')
const client = new Discord.Client()
player = new Player(client);//
client.player = player;




client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})


client.on('message', message => {
    if (message.content[0] == config.discord.prefix) {
        commands.commandProcess(message, client);
    }
})



const start = () => {

    console.log(config.discord.token);
    client.login(config.discord.token)//config.config.discord.token);

}
exports.start = start;





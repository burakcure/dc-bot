const response = require("./response.json")

var timer = false;
var timeHolder;
var drawList = [];

const indexOfNeed = (message) => {
    if (message.content.indexOf(' ') === -1) {
        message.channel.send(response.MISUSE_OF_COMMAND);
        return 0;
    }
    return message.content.indexOf(' ');


}
const isVoiceChatting = (message) => {
    if (message.member.voice.channel === null) {
        message.reply(response.NOT_IN_VOICE_CHANNEL);
        return false;
    }

    return true;

}





module.exports = {
    help: (message) => {
        message.channel.send(response.HELP_TEXT);

    },
    playSound: (message, client) => {
        if (indexOfNeed(message) != 0) {
            client.player.moveTo
            client.player.play(message, message.content.substr(indexOfNeed(message), message.content.length), true);
        }
    },
    disconnectVoice: (message, client) => {
        if (message.guild.voice.connection != null && message.guild.voice.channel.id==message.member.voice.channel.id)
            message.guild.voice.channel.leave();
        else if(message.guild.voice.connection!=null && message.guild.voice.channel.id!=message.member.voice.channel.id)
        message.channel.send(response.NOT_IN_SAME_VOICE_CHANNEL)
        else{

            message.channel.send(response.ALREADY_DISCONNECTED);
        }
    },
    playMeme: (message, meme) => {


        client.player.play(message, meme);

    },

    draw: (message) => {
        message.channel.send(`The winner is ${drawList[Math.floor(Math.random() * drawList.length)]}`)


    },

    joinVoiceChat: (message) => {
        console.log("I am joining voice channel");
        if (isVoiceChatting(message))
            message.member.voice.channel.join();

    },

    addDraw: (message) => {
        if (drawList.length < 20)
            if (indexOfNeed(message) != 0) {
                drawList.push((message.content).substr(indexOfNeed(message), message.content.length - 1));
            }
    },

    sendMeme: (message, memePic) => {
        message.channel.send(memePic);

    },
    startTimer: async (message) => {
        if (timer == false) {
            timer = true;
            timeHolder = message.author.username;
            message.channel.send(`Timer set to ${message.content.substr(indexOfNeed(message), message.content.length)} minutes.`)
            setTimeout(() => { message.reply("Timer is done"); timer = false; }, message.content.substr(indexOfNeed(message), message.content.length) * 60000)

        } else {
            message.channel.send(timeHolder + " currently using timer !");

        }

    },
    deleteDrawList: () => {

        drawList = [];

    },

    drawList: (message) => {
        let resp = "Drawlist:\n"
        for (let i = 0; i < drawList.length; i++) {
            resp += (drawList[i] + "\n");
        }
        message.channel.send(resp)

    },
    connectedChannel: (message) => {

        const connectedChannel = message.member.voice.channel;
        if (isVoiceChatting(message)) {
            message.reply(`Channel is ${connectedChannel}`);
        }
    },

    random: (message, _) => {
        message.channel.send("31")
    },

    bounce: (message) => {
        const guild = message.guild;
        const member = guild.member(message.author);
        message.reply(`I hear you ${message.member.user.username} !`)
        console.log();
        return
    },

    channelUserNumber: (message) => {
        if (isVoiceChatting(message)) {
            const memberSize = message.member.voice.channel.members.array();
            message.reply(` There is ${memberSize.length} member in your voice channel`)
        }
    },
    clearAll:(message,client)=>{
       if(message.member.hasPermission('MANAGE_MESSAGES')&&message.guild.me.hasPermission('MANAGE_MESSAGES')){
        message.channel.messages.fetch(200)
        .then((messages) =>{          
           messages.forEach(element=>{if(element.author.tag==message.guild.me.user.tag)element.delete()})}
            )
       }
    },
    clear20:(message,client)=>{

        if(message.member.hasPermission('MANAGE_MESSAGES')&&message.guild.me.hasPermission('MANAGE_MESSAGES')){
            message.channel.messages.fetch(20)
            .then((messages) =>{          
               messages.forEach(element=>{element.delete()})}
                ).catch(console.error())
           }
    }
};

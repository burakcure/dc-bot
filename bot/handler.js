const response = require("./response.json")

var timer = [];
var timeHolder;
var drawList = {};

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
    disconnectVoice: (message) => {
        if (message.guild.me.voice.connection != null && message.guild.voice.channel.id==message.member.voice.channel.id)
            message.guild.voice.channel.leave();
        else if(message.guild.me.voice.connection!=null && message.guild.voice.channel.id!=message.member.voice.channel.id)
        message.channel.send(response.NOT_IN_SAME_VOICE_CHANNEL)
        else{

            message.channel.send(response.ALREADY_DISCONNECTED);
        }
    },
    playMeme: (message, meme) => {


        client.player.play(message, meme);

    },



    joinVoiceChat: (message) => {
        console.log("I am joining voice channel");
        if (isVoiceChatting(message))
            message.member.voice.channel.join();

    },



    sendMeme: (message, memePic) => {
        message.channel.send(memePic);

    },
    startTimer: async (message) => {
        if (timer[message.author.tag] == (false || undefined) && message.content.substr(indexOfNeed(message), message.content.length)<30) {
            timer[message.author.tag] = true;
            message.channel.send(`Timer set to ${message.content.substr(indexOfNeed(message), message.content.length)} minutes.`)
            setTimeout(() => { message.reply(`Your timer is done ${message.guild.member(message.author).nickname}`); timer[message.author.tag] = false; }, message.content.substr(indexOfNeed(message), message.content.length) * 60000)
 
        } else if(timer[message.author.tag] == (false || undefined) && message.content.substr(indexOfNeed(message), message.content.length)>30){
            message.channel.send(response.MAX_TIMER_LIMIT);
        }
        else{
            message.channel.send(response.ALREADY_USING_TIMER);

        }

    },

    draw: (message) => {
        if(drawList[message.author.tag]&&drawList[message.author.tag].length!==0)
        message.channel.send(`The winner is ${drawList[message.author.tag][Math.floor(Math.random() * drawList[message.author.tag].length)]}`)
        else
        message.reply(response.EMPTY_DRAWLIST)

    },

    addDraw: (message) => {
        if (indexOfNeed(message) != 0) {
        if ( !drawList[message.author.tag] ||drawList[message.author.tag].length < 20 ){
                if(!drawList[message.author.tag])
                drawList[message.author.tag]=[]
                
                drawList[message.author.tag].push((message.content).substr(indexOfNeed(message)+1, message.content.length - 1));
                
        }
    }else
        message.channel.send(response.MISUSE_OF_COMMAND)
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
        message.reply(`I hear you ${member.nickname} !`)
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
        message.channel.messages.fetch(250)
        .then((messages) =>{          
            let bulkMessage=[];
           messages.forEach(element=>{if(element.author.tag==message.guild.me.user.tag)bulkMessage.push(element)})
           message.channel.bulkDelete(bulkMessage)
        }).then(
            message.channel.send("Success"))
            
       }
    },
    clearx:(message,amount)=>{

        if(message.member.hasPermission('MANAGE_MESSAGES')&&message.guild.me.hasPermission('MANAGE_MESSAGES')){
            message.channel.messages.fetch(amount)
            .then((messages) =>{          
               message.channel.bulkDelete(messages)}
                ).then(message.channel.send("Delete succesful")).catch(console.error())
           }
    }
};

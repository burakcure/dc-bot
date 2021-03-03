const handler = require('./handler')
const commandList = require('./commandList.json')
const fs = require('fs');
let customCommandList=require('./customCommand.json');
var cooldownOfUsers=[];

const getCommandFromMessage=(message)=>{
  
    if(cooldownOfUsers[message.author.tag]===undefined||cooldownOfUsers[message.author.tag]==0){

        cooldownOfUsers[message.author.tag]=3;
        var commandLast = message.content.length - 1;

        if (message.content.indexOf(' ') != -1) {
            commandLast = message.content.indexOf(' ') - 1;
        }

        return message.content.substr(1, commandLast)
    }else
    message.reply("You can only send command every 3 seconds")

    return -1;

}

const isCustomCommand=(commandText,userId,guildId)=>{
    if(!commandList[commandText]&&customCommandList[guildId+commandText+userId]){
        return customCommandList[guildId+commandText+userId].Type;
    }
    return commandList[commandText];
}

module.exports = {
    saveExit:()=>{
        const saveData=JSON.stringify(customCommandList);

        fs.writeFileSync('bot/customCommand.json', saveData, () => {
            process.exit();
        });
    
    
    },   

     cooldown:()=>{
         setInterval(()=>{
         
        try{
        Object.keys(cooldownOfUsers).forEach(element => {

        if(cooldownOfUsers[element]!=0){
            cooldownOfUsers[element]--
           
        }}) ;
    
     }catch{}},1000)},
     autosave:()=>{
        setInterval(()=>{
        
            const saveData=JSON.stringify(customCommandList);

            fs.writeFile('bot/customCommand.json', saveData)
        
        
   
    },3000)},
    commandProcess: (message, client) => {
      
        var getCommand = getCommandFromMessage(message);
        let guildId=message.guild.id;
        let userId=message.member.user.id;
        if(getCommand!=-1)
        try{

  
        switch (parseInt(isCustomCommand(getCommand,userId,guildId))) {

            case 0:
                handler.help(message)
                break;

            case 1:
                handler.channelUserNumber(message)
                break;

            case 2:
                handler.bounce(message)
                break;

            case 3:
                handler.connectedChannel(message)
                break;

            case 4:
                handler.random(message)
                break;

            case 5:
                handler.draw(message);
                break;

            case 6:
                handler.addDraw(message);
                break;

            case 7:
                handler.deleteDrawList(message.author.tag);
                break;

            case 8:
                handler.drawList(message);
                break;

            case 9:
                handler.joinVoiceChat(message);
                break;

            case 10:
                handler.disconnectVoice(message);
                break;

            case 11:
                handler.playSound(message, client)
                console.error()
                break;

            case 12:
                handler.startTimer(message);
                break;

            case 13:
                handler.clearAll(message,client);
                break;

            case 14:
                handler.clearx(message,20);
                break;

            case 15:
                handler.clearx(message,50);
                break;
            
            case 16:
                handler.skipSound(message,client)   
                break;

            case 17:
                let ret=handler.addCommand(message,customCommandList)
                if(ret==-1){
                    message.reply("Command couldn't be saved.")
                }else{
                    message.reply("Command saved successfully")
                    customCommandList=ret;
                }
                break;

            case 100:
                handler.playMeme(message,client,customCommandList[guildId+getCommand+userId].Link)
                break;

            case 101:
                handler.sendMeme(message,customCommandList[guildId+getCommand+userId].Link)
                break;

            default:
                message.reply(`There is no command named **${getCommand}** you can look at the list of commands using .help`)
            }
        }catch{

                message.reply("Failed")
            }
        }

    }



   






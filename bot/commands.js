const handler = require('./handler')
const commandList = require('./JSON/commandList.json')
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

const isCustomCommand=async (commandText,userId,guildId,db)=>{
    let getFromDB=  await db.findOne({where:{GuildID:guildId,OwnerID:userId,CommandName:commandText}})
    if(getFromDB!==null ){
        return getFromDB;
    }
    return false;
}

module.exports = {


     cooldown:()=>{
         setInterval(()=>{
         
        try{
        Object.keys(cooldownOfUsers).forEach(element => {

        if(cooldownOfUsers[element]!=0){
            cooldownOfUsers[element]--
           
        }}) ;
    
     }catch{}},1000)},
    commandProcess: async(message, client,db) => {
        
        var getCommand = getCommandFromMessage(message);
        let guildId=message.guild.id;
        let userId=message.member.user.id;
        if(getCommand!=-1)
        try{

        let checkCustom=await isCustomCommand(getCommand,userId,guildId,db)
        let type=0
        if(checkCustom==false)
            type=commandList[getCommand]
        else
            type= checkCustom.CommandType
        
        switch (parseInt(type)) {

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

                let ret=await handler.addCommand(message,db)
                if(ret==-1){
                    message.reply("Command couldn't be saved.")
                }else{
                    message.reply("Command saved successfully")
                   
                }
                break;

            case 18:

                let retH=await handler.deleteCommand(message,db)
                if(retH==-1){
                    message.reply("Command couldn't be deleted.")
                }else{
                    message.reply("Command deleted successfully")
            
                   
                }
                break;
            case 19:
                await handler.randomCommand(message,client,db)
            break;
            case 20:
                await handler.listCommand(message,db)
            break
            case 100:
                handler.playMeme(message,client,checkCustom.CommandLink)
                break;

            case 101:
               handler.sendMeme(message,checkCustom.CommandLink)
                break;

            default:
                message.reply(`There is no command named **${getCommand}** you can look at the list of commands using .help`)
            }
        }catch{
            
            message.reply("Failed")
            }
        }

    }



   






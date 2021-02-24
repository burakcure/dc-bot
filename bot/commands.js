const handler = require('./handler')
const commandList = require('./commandList.json')


module.exports = {
    commandProcess: (message, client) => {
        var commandLast = message.content.length - 1;
        if (message.content.indexOf(' ') != -1) {
            commandLast = message.content.indexOf(' ') - 1;
        }
        var getCommand = message.content.substr(1, commandLast)
        console.log(commandList[getCommand])
        switch (commandList[getCommand]) {
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
                handler.deleteDrawList();
                break;
            case 8:
                handler.drawList(message);
                break;
            case 9:
                handler.joinVoiceChat(message);
                break;
            case 10:
                handler.disconnectVoice(message, client);
                break;
            case 11:
                handler.playSound(message, client);
                break;
            case 12:
                handler.startTimer(message);
                break;
            default:
                message.reply(`There is no command named ${getCommand} you can look at the list of commands using .help`)
        }

    }


}


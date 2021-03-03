
class CustomCommand{
   constructor(guildId,owner,command,type,link){
        this.GuildId=guildId;
        this.Command=command;
        this.Owner=owner;
        this.Type=type;
        this.Link=link;

   }
   commandType={
    "pic":101,
    "sound":100

   }
  
   save(customCommandFile){
    if((this.commandType[this.Type]!=undefined)&&customCommandFile[this.GuildId+this.Command+this.Owner]==undefined){
        
      
        
        customCommandFile[this.GuildId+this.Command+this.Owner]={Type:this.commandType[this.Type],Link:this.Link};
      
        

        return customCommandFile;
    }else{
        return -1;

    }
   }

}

exports.CustomCommand=CustomCommand;
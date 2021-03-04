
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
    if((this.commandType[this.Type]!=undefined)&&customCommandFile[this.GuildId+this.Command+this.Owner]==undefined&&this.Link!=undefined&&this.Command!=undefined&&this.Type!=undefined){
        
      
        
        customCommandFile[this.GuildId+this.Command+this.Owner]={Type:this.commandType[this.Type],Link:this.Link};
      
        

        return customCommandFile;
    }else{
        return -1;

    }
   }

   delete(customCommandFile){
    if( customCommandFile[this.GuildId+this.Command+this.Owner]!=undefined){
        
      
        
        delete customCommandFile[this.GuildId+this.Command+this.Owner];
      
        

        return customCommandFile;
    }else{
        return -1;

    }

   }

}

exports.CustomCommand=CustomCommand;
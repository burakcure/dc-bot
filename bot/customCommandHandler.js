
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
 
   async add(db){
    if((this.commandType[this.Type]!=undefined)&&this.Link!=undefined&&this.Command!=undefined&&this.Type!=undefined&&  (await db.findOne({where:{GuildID:this.GuildId,OwnerID:this.Owner,CommandName:this.Command}}))===null){
        
      
       await db.create({GuildID:this.GuildId,OwnerID:this.Owner,CommandName:this.Command,CommandType:this.commandType[this.Type],CommandLink:this.Link})
    
        return 1;
    }else{
        return -1;

    }
   }

   async delete(db){
       let element=await db.findOne({where:{GuildID:this.GuildId,OwnerID:this.Owner,CommandName:this.Command}})
    if( element!==null){
        
      
        await db.destroy({where:{GuildID:this.GuildId,OwnerID:this.Owner,CommandName:this.Command}});
        
        return 1;
    }else{
        return -1;

    }

   }

}

exports.CustomCommand=CustomCommand;
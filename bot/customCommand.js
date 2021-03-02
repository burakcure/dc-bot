
class CustomCommand{
   constructor(command,owner,type,link){
        this.Command=command;
        this.Owner=owner;
        this.Type=type;
        this.Link=link;

   }
   save(customCommandFile){
    if(customCommandFile[this.Command]==undefined){
        customCommandFile[this.Command]={Owner:this.Owner,Type:this.Type,Link:this.Link};

        return customCommandFile;
    }else{
        return -1;

    }
   }

}

exports.CustomCommand=CustomCommand;
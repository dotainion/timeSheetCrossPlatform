export class Assert{
    constructor(){

    }

    message(message, defaultMessage){
        if(message) return message;
        return defaultMessage;
    }

    isArray(item, message=null){
        if(!Array.isArray(item)){
            throw new Error(this.message(message, `"${item} is not an array."`));
        }
    }
}
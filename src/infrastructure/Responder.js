import axios from 'axios';


export class Responder{
    URL = 'https://time-sheet-cross-platform.herokuapp.com';//'http://localhost:2000';

    async post(url, data=null){
        try{
            return await axios.post(this.URL + url, data);
        }catch(error){
            console.log(error.message);
            throw new Error({error: error.message});
        }
    }

    async get(url, data=null){
        try{
            return await axios.get(this.URL + url, data);
        }catch(error){
            console.log(error.message);
            throw new Error({error: error.message});
        }
    }
}
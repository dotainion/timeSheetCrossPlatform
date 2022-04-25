export class Collector{
    collected = [];

    add(item){
        this.collected.push(item);
    }
    
    list(){
        return this.collected;
    }
    
    first(){
        return this.collected?.[0];
    }
    
    last(){
        return this.collected?.[this.collected.length -1];
    }

    clear(){
        return this.collected = [];
    }

    hasItems(){
        return this.collected.length > 0;
    }
}
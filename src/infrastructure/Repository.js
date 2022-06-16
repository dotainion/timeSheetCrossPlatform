import { db } from "./config/AuthConfig";

export class Repository{
    transform(id, record){
        if(!record) return null
        return { id, info: record }
    }

    objToWhere(obj){
        let where = [];
        for(let key of Object.keys(obj || {})){
            let keyObj = {};
            keyObj[key] = obj[key];
            where.push(keyObj);
        }
        return where;
    }

    async addData(collection, data, setUid=null){
        let collector = db.collection(collection);
        if(setUid !== null) await collector.doc(setUid).set(data);
        else await collector.add(data);
        return await this.getWhere(collection, this.objToWhere(data));
    }

    async getWhere(collection, where=[], limit=false){
        let dataCollector = [];
        let collector = db.collection(collection);
        where?.forEach((params)=>{
            const key = Object.keys(params)[0];
            collector = collector.where(key, '==', `${params[key]}`);
        });
        if (limit !== false) collector.limit(limit);
        let data = await collector.get();
        data.forEach((record) =>{ 
            dataCollector.push(this.transform(record.id, record.data()));
        });
        return dataCollector;
    }

    async getDataById(collection, uId){
        const aUser = db.collection(collection).doc(uId);
        return this.transform(aUser.id, (await aUser.get()).data());;
    }

    async updateData(collection, data, id){
        const delRef = db.collection(collection).doc(id);
        await delRef.update(data);
        return this.transform(delRef.id, data);
    }

    async deleteData(collection, id){
        const delRef = db.collection(collection).doc(id);
        await delRef.delete();
        const data = await delRef.get();
        return this.transform(delRef.id, data);
    }

    async deleteDatasByField(collection, queryKey, queryValue){
        let param = {};
        param[queryKey] = queryValue;
        let deletedRecords = [];
        const records = await this.where(collection, [param]);
        for(let record of records){
            const deletedRecord = this.deleteData(collection, record?.id);
            if(deletedRecord?.length){
                deletedRecords.push(deletedRecord);
            }
        }
        return deletedRecords;
    }

    async updateDataWhere(collection, data, where=[], limit=false){
        let objects = {}
        where.map((obj)=>{
            const key = Object.keys(obj);
            objects[key] = obj[key];
        });
        const records = await this.getWhere(collection, where, limit);
        for (let record of records){
            let validCollector = [];
            for (let key of Object.keys(objects)){
                if (record['info'][key] == objects[key]){
                    validCollector.push(true);
                }
            }
            if (validCollector.length == Object.keys(objects).length){
                await this.updateData(collection, data, record?.id);
            }
        };
        return true;
    }

    observer = (collection, where=[], observe=null) =>{
        let dataCollector = [];
        let collector = db.collection(collection);
        where?.forEach((param)=>{
            const key = Object.keys(param)[0];
            collector = collector.where(key, '==', `${param[key]}`);
        });
        collector.onSnapshot((data)=>{
            data?.forEach((record) => {
                dataCollector.push(this.transform(record.id, record));
            });
            observe?.(dataCollector);
        });
    }
}
import { db } from "./config/AuthConfig";

export class Repository{
    transform(id, record){
        if(!record) return null
        return { id, info: record }
    }

    async addData(collection, data, setUid=null){
        let state;
        let collector = db.collection(collection);
        if(setUid !== null) state = await collector.doc(setUid).set(data);
        else state = await collector.add(data);
        return this.transform(state.id, (await state.get()).data());
    }

    async getWhere(collection, where=[], limit=false){
        let dataCollector = [];
        let collector = db.collection(collection);
        where?.forEach((params)=>{
            const key = Object.keys(params)[0];
            collector.where(key, '==', params[key]);
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
        data = await delRef.get();
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

    async updateDataByField(collection, data, queryKey, queryValue, queryKey2=null, queryValue2=null, limit=false){
        let param = {};
        param[queryKey] = queryValue;
        const records = await this.getWhere(collection,[param], limit);
        for (let record of records){
            if (queryKey2 && queryKey2){
                if (record?.info[queryKey] === queryValue && record?.info[queryKey2] === queryValue2){
                    await this.updateData(collection, data, record?.id);
                }
            }else{
                if (record?.info[queryKey] === queryValue){
                    await this.updateData(collection, data, record?.id);
                }
            }
        };
        return true;
    }

    observer = (collection, where=[], observe=null) =>{
        let dataCollector = [];
        let collector = db.collection(collection);
        where?.forEach((param)=>{
            const key = Object.keys(param)[0];
            collector.where(key, '==', param[key]);
        });
        collector.onSnapshot((data)=>{
            data?.forEach((record) => {
                dataCollector.push(this.transform(record.id, record));
            });
            observe?.(dataCollector);
        });
    }
}
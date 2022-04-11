import { db } from "./config/AuthConfig";

export class Repository{
    transform(id, record){
        console.log(id);
        if(!record) return null
        return { id, info: record }
    }

    async addData(collection, data, setUid=null){
        let state = null;
        if(setUid !== null){
            state = await db.collection(collection).doc(setUid).set(data);
            
        }else{
            const accountRef = db.collection(collection);
            state = await accountRef.add(data);
        }
        return this.transform(state.id, (await state.get()).data());
    }

    async getDataByField(collection,queryKey,queryValue,limit=false){
        let allData = [];
        let accountRef = "";
        if (limit !== false) accountRef = db.collection(collection).where(queryKey,"==",queryValue).limit(limit);
        else accountRef = db.collection(collection).where(queryKey,"==",queryValue);
        let data = await accountRef.get();
        data.forEach((record) => {
            allData.push(this.transform(record.id, record.data()));
        });
        return allData;
    }

    async getDataById(collection, uId){
        if(uId){
            const aUser = db.collection(collection).doc(uId);
            return this.transform(aUser.id, (await aUser.get()).data());;
        }
        return null;
    }

    async getData(collection,limit=false){
        let allData = [];
        let accountRef = "";
        if (!limit) accountRef = db.collection(collection);
        else accountRef = db.collection(collection).limit(limit);
        let data = await accountRef.get();
        data.forEach((record) => {
            allData.push(this.transform(record.id, record.data()));
        });
        return allData;
    }

    async updateData(collection, data, id){
        if(id){
            const delRef = db.collection(collection).doc(id);
            await delRef.update(data);
            const data = await delRef.get();
            return this.transform(delRef.id, data);
        }
        return null;
    }

    async deleteData(collection, id){
        if(id){
            const delRef = db.collection(collection).doc(id);
            await delRef.delete();
            const data = await delRef.get();
            return this.transform(delRef.id, data);
        }
        return null;
    }

    async deleteDatasByField(collection, queryKey, queryValue){
        let deletedRecords = [];
        const records = await this.getDataByField(collection, queryKey, queryValue);
        for(let record of records){
            const deletedRecord = this.deleteData(collection, record?.id);
            if(deletedRecord?.length){
                deletedRecords.push(deletedRecord);
            }
        }
        return deletedRecords;
    }

    async updateDataByField(collection, data, queryKey, queryValue, queryKey2=null, queryValue2=null, limit=false){
        const records = await this.getDataByField(collection, queryKey, queryValue, limit);
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

    observer = (collection, queryKey, queryValue, observe) =>{
        db.collection(collection)
        .where(queryKey, "==", queryValue)
        .onSnapshot((data)=>{
            let ranges = [];
            data.forEach((record) => {
                ranges.push({ id: record.id, info: record.data() });
            });
            observe?.(ranges);
        });
    }
}
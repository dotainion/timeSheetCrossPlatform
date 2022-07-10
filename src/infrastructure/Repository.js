import { db } from "./config/AuthConfig";
import { getFirestore, collection, getDoc, getDocs, deleteDoc, enableIndexedDbPersistence, onSnapshot, where, query, limit, doc, setDoc } from 'firebase/firestore';

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

    async addData(collectionRef, data, setUid=null){
        let collector = collection(db, collectionRef);//;
        if(setUid !== null) await collector.doc(setUid).set(data);
        else await collector.add(data);
        return await this.getWhere(collectionRef, this.objToWhere(data));
    }

    async getWhere(collectionRef, wheres=[], limits=false){
        let whereCollector = [];
        let dataCollector = [];
        wheres?.forEach((params)=>{
            const key = Object.keys(params)[0];
            whereCollector.push(where(key, '==', `${params[key]}`));
        });

        if (limits === false) limits = [];
        else limits = [limit(limits)];

        const queryRef = query(collection(db, collectionRef), ...whereCollector, ...limits);
        const data = await getDocs(queryRef);

        data.forEach((record) =>{ 
            dataCollector.push(this.transform(record.id, record.data()));
        });
        return dataCollector;
    }

    async getWhereTimestampRange(collectionRef, timestampForm, timestampTo, userId, limits=false){
        let dataCollector = [];
       if (limits === false) limits = [];
        else limits = [limit(limits)];

        const queryRef = query(collection(db, collectionRef),
            where('timestamp', '>=', timestampForm),
            where('timestamp', '<=', timestampTo),
            where('userId', '==', userId), ...limits);

            const data = await getDocs(queryRef);
        data.forEach((record) =>{ 
            dataCollector.push(this.transform(record.id, record.data()));
        });
        return dataCollector;
    }

    async getDataById(collectionRef, uId){
        const docRef = doc(db, collectionRef, uId);
        const snapshot = await getDoc(docRef);
        return this.transform(docRef.id, snapshot.data());
    }

    async updateData(collectionRef, data, id){
        const docRef = doc(db, collectionRef, id);
        await setDoc(docRef, data, {merge: true});
        return this.transform(docRef.id, data);
    }

    async deleteData(collectionRef, id){
        const docRef = doc(db, collectionRef, id);
        await deleteDoc(docRef);
        return true;// this.transform(docRef.id, data);
    }

    async deleteDatasByField(collectionRef, queryKey, queryValue){
        let param = {};
        param[queryKey] = queryValue;
        let deletedRecords = [];
        const records = await this.getWhere(collectionRef, [param]);
        for(let record of records){
            const deletedRecord = this.deleteData(collectionRef, record?.id);
            if(deletedRecord?.length){
                deletedRecords.push(deletedRecord);
            }
        }
        return deletedRecords;
    }

    async updateDataWhere(collectionRef, data, wheres=[], limits=false){
        let objects = {}
        wheres.map((obj)=>{
            const key = Object.keys(obj);
            objects[key] = obj[key];
        });
        const records = await this.getWhere(collectionRef, wheres, limits);
        for (let record of records){
            let validCollector = [];
            for (let key of Object.keys(objects)){
                if (record['info'][key] == objects[key]){
                    validCollector.push(true);
                }
            }
            if (validCollector.length == Object.keys(objects).length){
                await this.updateData(collectionRef, data, record?.id);
            }
        };
        return true;
    }

    observer = (collectionRef, where=[], observe=null) =>{
        let dataCollector = [];
        let collector = collection(db, collectionRef);//
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
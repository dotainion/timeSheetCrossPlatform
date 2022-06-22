import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, enableIndexedDbPersistence } from 'firebase/firestore';
import { FB_API_KEY, FB_APP_ID, FB_AUTH_DOMAIN, FB_MEASUREMENT_ID, FB_MESSAGING_SENDER_ID, FB_PROJECT_ID, FB_STORAGE_BUCKET } from './EnvVariables';

export const fbConfig = {
    apiKey: FB_API_KEY,
    authDomain: FB_AUTH_DOMAIN,
    projectId: FB_PROJECT_ID,
    storageBucket: FB_STORAGE_BUCKET,
    messagingSenderId: FB_MESSAGING_SENDER_ID,
    appId: FB_APP_ID,
    measurementId: FB_MEASUREMENT_ID
};

const app = initializeApp(fbConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
enableIndexedDbPersistence(db).catch((err)=>{
    if (err.code == 'failed-precondition') {
        
    } else if (err.code == 'unimplemented') {
        
    }
})


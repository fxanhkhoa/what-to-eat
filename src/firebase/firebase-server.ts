import { deleteApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: 'AIzaSyDn-cV4-Qkpe7FUDud6_Muq96pYqI29fSo',
	authDomain: 'what-to-eat-90d3e.firebaseapp.com',
	projectId: 'what-to-eat-90d3e',
	storageBucket: 'what-to-eat-90d3e.appspot.com',
	messagingSenderId: '276849599452',
	appId: '1:276849599452:web:598db247d5eb2e2f302519',
	measurementId: 'G-FWE0TE8LCZ',
	databaseURL: "https://what-to-eat.firebaseio.com",
};

let firebaseApp;
if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApp();
	deleteApp(firebaseApp);
	firebaseApp = initializeApp(firebaseConfig);
}

export const auth = getAuth(firebaseApp);
export const database = getFirestore(firebaseApp);
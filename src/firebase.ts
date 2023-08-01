import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyAzN_Cqw7vUCID-of8SpodOIUVWuHlaaq0',
    authDomain: 'woof-app-ff670.firebaseapp.com',
    projectId: 'woof-app-ff670',
    storageBucket: 'woof-app-ff670.appspot.com',
    messagingSenderId: '814611483616',
    appId: '1:814611483616:web:588c4a5952e7b03697f985',
    measurementId: 'G-QEKE435CE2',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user !== null) {
        console.log('logged in!');
    } else {
        console.log('not logged');
    }
});

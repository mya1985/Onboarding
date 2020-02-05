import firebase from 'firebase';
import firebaseSecrets from './firebaseSecrets';

//<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>

const config = {
    apiKey: firebaseSecrets.apiKey,
    authDomain: firebaseSecrets.authDomain,
    databaseURL: firebaseSecrets.databaseURL,
    projectId: firebaseSecrets.projectId
};

const fire = firebase.initializeApp(config);

export default fire;

export const firebaseAuth = fire.auth();
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'
var config = {
    messagingSenderId: "520549623097",
    apiKey: "AIzaSyBSGFT4fkVhWAfekIItYpbP74ughaACNpI",
    authDomain: "fproject-a5499.firebaseapp.com",
    databaseURL: "https://fproject-a5499.firebaseio.com",
    projectId: "fproject-a5499",
    
};
const fire = firebase.initializeApp(config);
export default fire
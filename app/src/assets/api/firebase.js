import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyA0VlKZxPxyGXSZ3eZR7w4QTVglu30PBgc",
    authDomain: "esalesman-coe.firebaseapp.com",
    databaseURL: "https://esalesman-coe.firebaseio.com",
    projectId: "esalesman-coe",
    storageBucket: "esalesman-coe.appspot.com",
    messagingSenderId: "982633041160",
    appId: "1:982633041160:web:2a507aa66bd19a2a15b0bd",
    measurementId: "G-8LEXBCG0XZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth()

export default firebaseConfig
import firebase from 'firebase'

const config={
	apiKey: "AIzaSyD7V8arOP4_eAb5SeVK4vJdqZD4eGVlQwE",
    authDomain: "election-2021-8d993.firebaseapp.com",
    projectId: "election-2021-8d993",
    storageBucket: "election-2021-8d993.appspot.com",
    messagingSenderId: "446498301904",
    appId: "1:446498301904:web:d34215082593bc752bfbd5"
}

firebase.initializeApp(config);
export default firebase;
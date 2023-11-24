import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {

    apiKey: "AIzaSyAwdqHjX0rFuOnsHKMlqFUsYTtOLlUxfeA",
    authDomain: "dai-lab-02.firebaseapp.com",
    projectId: "dai-lab-02",
    storageBucket: "dai-lab-02.appspot.com",
    messagingSenderId: "83780644848",
    appId: "1:83780644848:web:73871069eb3022b3faf735"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
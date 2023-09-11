// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAU9yq9YEoG8lehCdonkwXLGzCumqyQfhI',
    authDomain: 'solo-project-1-c8107.firebaseapp.com',
    projectId: 'solo-project-1-c8107',
    storageBucket: 'solo-project-1-c8107.appspot.com',
    messagingSenderId: '647291164016',
    appId: '1:647291164016:web:795b82487228dc3c3d6bb5',
    measurementId: 'G-KK2ZS4N7MQ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

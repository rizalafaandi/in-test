const firebase = require('firebase/app');

const firebaseInit = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyBkLG3OFB4ICVM-dO2m5qcILHtV3ct3Bpk',
    authDomain: 'oauth--sign.firebaseapp.com',
    projectId: 'oauth--sign',
    storageBucket: 'oauth--sign.firebasestorage.app',
    messagingSenderId: '960087290675',
    appId: '1:960087290675:web:8b2471e66beca7e87cc446',
    measurementId: 'G-NYYSJZSCTS'
  };
  return firebase.initializeApp(firebaseConfig);
};

module.exports = { firebaseInit };

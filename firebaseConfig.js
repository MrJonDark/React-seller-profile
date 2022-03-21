require('firebase/auth');
const firebase = require('firebase');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey');
var firebaseConfig = {
  apiKey: 'AIzaSyBbYAgMV1qKR5Vb-rtvYnU_ZHQsoT0S-Fc',
  authDomain: 'shopless-merchant.firebaseapp.com',
  databaseURL: 'https://shopless-merchant.firebaseio.com',
  projectId: 'shopless-merchant',
  storageBucket: 'shopless-merchant.appspot.com',
  messagingSenderId: '331169741602',
  appId: '1:331169741602:web:5d1ba972071edb2c4fc37b',
  measurementId: 'G-MFD6WEDTWF',
};
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://shopless-merchant.firebaseio.com',
});
module.exports = { firebase, admin };

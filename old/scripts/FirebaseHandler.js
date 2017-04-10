// Initialize Firebase
var config = {
  apiKey: "AIzaSyA3bJxurQEHzJdwlx8WcqfsOsXwf2NyLCo",
  authDomain: "webcrystal-88c50.firebaseapp.com",
  databaseURL: "https://webcrystal-88c50.firebaseio.com",
  storageBucket: "webcrystal-88c50.appspot.com",
  messagingSenderId: "200206586154"
};
firebase.initializeApp(config);


let user = undefined

// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: '#!/app',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccess: function(currentUser, credential, redirectUrl) {
      window.location.hash = '#!/app'
      setRoute()
      user = currentUser
      setAppInfo(currentUser)
    }
  },
  queryParameterForWidgetMode: "#!/login?mode",
  // Terms of service url.
  tosUrl: '#!/tos'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);


// Firebase Database
var uid = firebase.auth().currentUser.uid;
var db = new firebase.database().ref('/users/'+uid)
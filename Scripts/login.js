const login = document.querySelector('.login');

login.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = login.email.value;
  const password = login.password.value;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function (credentials) {
  
      const db = firebase.firestore();
      const usersRef = db.collection('users');
      usersRef.doc(credentials.user.uid).get().then(function (doc) {
        if(doc.exists) {
          const data = doc.data();

          
  
          if(data.admin){
            window.location.href = './admin.html';
          } else{
            window.location.href = './userProfile.html';
          }
    
        }
       
      });
    

  })
  .catch(function(error) {
    // Handle Errors here.
    console.log(error)

    login.querySelector('.form__error').classList.remove('hidden');
    // ...
  });
});



const authProfileSpan = document.querySelector('.spanProfile');
const logout = document.querySelector('.logout');

firebase.auth().onAuthStateChanged(function(user) {
console.log(user);
if(user) {
    // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada
  

    const db = firebase.firestore();
    const usersRef = db.collection('users');
    usersRef.doc(user.uid).get().then(function (doc) {
      if(doc.exists) {
        const data = doc.data();
        authProfileSpan.innerText = data.nameUser;
      }
     
    });
  } 
});

// cerrar sesión
logout.addEventListener('click', function(event) {
    event.preventDefault();
    firebase.auth().signOut();
  });
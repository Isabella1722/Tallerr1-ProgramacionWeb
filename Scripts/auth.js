
const authProfileSpan = document.querySelector('.spanProfile');
const logout = document.querySelector('.logout');

var userInfo;


firebase.auth().onAuthStateChanged(function(user) {
console.log(user);
if(user) {
    // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada
  

    const db = firebase.firestore();
    const usersRef = db.collection('users');
    usersRef.doc(user.uid).get().then(function (doc) {
      if(doc.exists) {
        const data = doc.data();
        console.log(doc.data());
        userInfo=data;
        userInfo.uid=user.uid;
        if(authProfileSpan){
          authProfileSpan.innerText = data.name;
        }
        

        if(data.admin){
          window.location.href = '/Html/admin.html';
        }
  
      }
     
    });
  } 
});

// cerrar sesión
if(logout){
  logout.addEventListener('click', function(event) {
    console.log("hh");
      event.preventDefault();
      firebase.auth().signOut();
      //authProfileSpan.innerText = '';
      window.location.href = "../index.html";
    });
}

const login = document.querySelector('.login');

login.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = login.email.value;
  const password = login.password.value;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function () {

      //window.location.href = '/Html/admin.html';
   
      window.location.href = '/Html/userProfile.html';
      /*
      const data = doc.data();
      if(data.admin){
        window.location.href = '/Html/admin.html';
      }*/
    

  })
  .catch(function(error) {
    // Handle Errors here.
    console.log(error)

    login.querySelector('.form__error').classList.remove('hidden');
    // ...
  });
});


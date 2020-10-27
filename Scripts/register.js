const db = firebase.firestore();
const usersRef = db.collection('users');
const register = document.querySelector('.register');

console.log(register);
register.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("holisssss");
    
    const name = register.nameUser.value;
    const lastName = register.lastName.value;
    const phone = register.phone.value;
    const address = register.address.value;
    const neighborhood = register.neighborhood.value;
    const city = register.city.value;
    const email = register.email.value;
    const password = register.password.value;
    
    
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (credentials) {
  
      const uid = credentials.user.uid;
  
      usersRef.doc(uid).set({
        name: name,
        lastName: lastName,
        phone: phone,
        address: address,
        neighborhood: neighborhood,
        city: city,
        email: email,
        
      
      }).then(function () {
       window.location.href = '/Html/userProfile.html';
      });

      console.log(credentials);
      console.log(credentials.user.uid);
      register.querySelector('.form__error').classList.add('hidden');
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error)
  
      register.querySelector('.form__error').classList.remove('hidden');
      // ...
    });

 
  });

  
  
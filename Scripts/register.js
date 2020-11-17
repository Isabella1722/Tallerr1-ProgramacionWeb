const db = firebase.firestore();
const usersRef = db.collection('users');
const register = document.querySelector('.register');


//modal
const closeBtn = document.querySelector('.close');
const modal = document.querySelector('.modal');
const modalC = document.querySelector('.modalContainer');
const viewBtn = document.querySelector('.btnPrimary--viewList');

console.log(register);
register.addEventListener('submit', function (event) {
    event.preventDefault();
    
    
    const name = register.nameUser.value;
    const lastName = register.lastName.value;
    const phone = register.phone.value;
    const address = register.address.value;
    const neighborhood = register.neighborhood.value;
    const city = register.city.value;
    const email = register.email.value;
    const password = register.password.value;
    const confirmPassword = register.confirmPassword.value;
    
    
  
    if(password===confirmPassword){
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
         
         modalC.style.opacity = "1";
        modalC.style.visibility = "visible";
        modal.classList.toggle("modal__close");
        });
  
        console.log(credentials);
        console.log(credentials.user.uid);
        register.querySelector('.form__error').classList.add('hidden');
        register.querySelector('.form__errorC').classList.add('hidden');

        
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error)
    
        register.querySelector('.form__error').classList.remove('hidden');
        // ...
      });
  
    }else{
      register.querySelector('.form__errorC').classList.remove('hidden');
    }
   
 
  });

  window.addEventListener("click", function (e) {

    console.log(e.target);
    if (e.target == modalC) {
        modal.classList.toggle("modal__close");

        setTimeout(function () {
            modalC.style.opacity = "0";
            modalC.style.visibility = "hidden";
        }, 850);
    }
});

viewBtn.addEventListener("click", function () {

  window.location.href = './userProfile.html';
});
  
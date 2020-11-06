const login = document.querySelector('.login');

login.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = login.email.value;
  const password = login.password.value;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function () {

      //window.location.href = '/Html/admin.html';
   
      window.location.href = '/Html/userProfile.html';
    
    

  })
  .catch(function(error) {
    // Handle Errors here.
    console.log(error)

    login.querySelector('.form__error').classList.remove('hidden');
    // ...
  });
});

//modal carrito
const modal = document.querySelector('.modal--vertical');
const modalC = document.querySelector('.modalContainer--vertical');
const shopBtn = document.querySelector('.btnPrimary--viewList');
const cartBtn = document.querySelector('.optionsBar__icons--shopping');

cartBtn.addEventListener("click", function () {
  modalC.style.opacity = "1";
  modalC.style.visibility = "visible";
  modal.classList.toggle("modal__close--vertical");

});



window.addEventListener("click", function (e) {

  console.log(e.target);
  if (e.target == modalC) {
    modal.classList.toggle("modal__close--vertical");

    setTimeout(function () {
      modalC.style.opacity = "0";
      modalC.style.visibility = "hidden";
    }, 850);
  }
});
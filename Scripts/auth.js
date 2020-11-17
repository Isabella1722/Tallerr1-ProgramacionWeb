
const authProfileSpan = document.querySelector('.spanProfile');
const logout = document.querySelector('.logout');

var userInfo;

const userAuth = document.querySelector('.userAuth');
const cartAuth = document.querySelector('.cartAuth');



firebase.auth().onAuthStateChanged(function (user) {
  console.log(user);
  if (user) {
    

    if (window.location.href.indexOf("Html") > -1) {
      if (userAuth) {
        userAuth.href = './userProfile.html';
      }

      if (cartAuth) {
        cartAuth.href = './cart.html';
      }

    } else {
      if (userAuth) {
        userAuth.href = './Html/userProfile.html';
      }
      if (cartAuth) {
        cartAuth.href = './Html/cart.html';
      }
    }






    const db = firebase.firestore();
    const usersRef = db.collection('users');
    usersRef.doc(user.uid).get().then(function (doc) {
      if (doc.exists) {
        const data = doc.data();
        console.log(doc.data());
        userInfo = data;
        userInfo.uid = user.uid;


        if (window.getCartProducts) {
          getCartProducts();
          getQuantityProducts();

        }


        if (window.getCartOrders) {
          getCartOrders();
          getQuantityProducts();
        }

        if (window.getOrder) {
          getOrder();

        }

        if (window.getValue) {
          getValue();



        }

        if (window.getDeleteShop) {
          const pay2Btn = document.querySelector('.btnPrimary--payShop');

          pay2Btn.addEventListener('click', function () {
            getDeleteShop();
          });
        }


        if (authProfileSpan) {
          authProfileSpan.innerText = data.name;
        }


      }

    });
  } else {
    if (window.location.href.indexOf("Html") > -1) {

      if (userAuth) {
        userAuth.href = './login.html';
      }

      if (cartAuth) {
        cartAuth.href = './login.html';
      }


    } else {

      if (userAuth) {
        userAuth.href = './Html/login.html';
      }

      if (cartAuth) {
        cartAuth.href = './Html/login.html';
      }


    }
  }
});


if (logout) {
  logout.addEventListener('click', function (event) {
    console.log("hh");
    event.preventDefault();
    firebase.auth().signOut();
    window.location.href = "../index.html";
    console.log("cerró sesión");
  });
}

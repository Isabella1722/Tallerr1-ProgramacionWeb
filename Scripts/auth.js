
const authProfileSpan = document.querySelector('.spanProfile');
const logout = document.querySelector('.logout');

var userInfo;

const userAuth= document.querySelector('.userAuth'); 
const cartAuth=document.querySelector('.cartAuth'); 



firebase.auth().onAuthStateChanged(function (user) {
  console.log(user);
  if (user) {
    // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada

    if(window.location.href.indexOf("Html")> -1){
      if(userAuth){
        userAuth.href = './userProfile.html';
      }

      if(cartAuth){
        cartAuth.href = './cart.html';
      }
    
    }else{
      if(userAuth){
        userAuth.href = './Html/userProfile.html';
      }
      if(cartAuth){
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

        
        if(window.getCartProducts){
          getCartProducts();
          getQuantityProducts();

        }


        if(window.getCartOrders){
          getCartOrders();
          getQuantityProducts();
        }
    
        if(window.getOrder){
          getOrder();

        }

        if(window.getValue){
          getValue();


        
        }

        
      
        /*

        if(window.getCart){
          getCart();

        }*/

        // if(window.getCart2){
        //   getCart2();

        // }

        if (authProfileSpan) {
          authProfileSpan.innerText = data.name;
        }

        /*
                if(data.admin){
                  window.location.href = '/Html/admin.html';
                }
          */
      }

    });
  }else{
    if(window.location.href.indexOf("Html")> -1){
      
      if(userAuth){
        userAuth.href = './login.html';
      }

      if(cartAuth){
        cartAuth.href = './login.html';
      }
     
  
    }else{

      if(userAuth){
        userAuth.href = './Html/login.html';
      }

      if(cartAuth){
        cartAuth.href = './Html/login.html';
      }
 
  
    }
  }
});

// cerrar sesión
if (logout) {
  logout.addEventListener('click', function (event) {
    console.log("hh");
    event.preventDefault();
    firebase.auth().signOut();
    //authProfileSpan.innerText = '';
    window.location.href = "../index.html";
    console.log("cerró sesión");
  });
}

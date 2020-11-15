

window.addEventListener('load', function () {

    const finalBtn = document.querySelector('.btnPrimary--pay');
    const shoppingBtn = document.querySelector('.btnPrimary--then');

    if (finalBtn) {
        finalBtn.addEventListener("click", function () {
            window.location.href = "../Html/order.html";
        });

    }

    if (shoppingBtn) {
        shoppingBtn.addEventListener("click", function () {
            window.location.href = "../Html/products.html";
        });

    }

    /*
    firebase.auth().onAuthStateChanged(function (user) {
        console.log(user);
        if (user) {
            // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada
            const userId = user.uid;
            console.log("USUARIO" + userId);


        }
    });
    

    */


});

const db = firebase.firestore();
const cartRef = db.collection('cart');
let storageRef = firebase.storage().ref();

const pCartList = document.querySelector('.order');


function renderCartProducts(list) {
    pCartList.innerHTML = '';
    list.forEach(function (elem, i) {
        // console.log(elem.nameProduct);
        const newCartProduct = document.createElement('section');
        newCartProduct.classList.add('orderProduct');

        newCartProduct.innerHTML = `
        <div class="orderProduct__imgContainer">
            <img src="" alt="" class="orderProduct__img">
        </div>
        <div class="orderProduct__info">
            <img class="orderProduct__delete" src="../Images/delete.png" alt="delete">
            <h3 class="orderProduct__title">${elem.name}</h3>
            <h4 class="orderProduct__brand">${translateBrand(elem.brand)}</h4>
            <h3 class="orderProduct__price">Precio: <span class="orderProduct__price">${elem.price}</span></h3>
        </div>
        `;


        storageRef.child(elem.image).getDownloadURL().then(function (url) {
            var img = newCartProduct.querySelector('img');
            img.src = url;
        }).catch(function (error) {
            // Handle any errors
        });

        pCartList.appendChild(newCartProduct);

    });

}


let cartProductsList = [];
function getCartProducts() {
    cartRef.doc(userInfo.uid).get().then((doc) => {
        cartProductsList = [];
        if (doc.exists) {
            doc.data().products.forEach(function (item) {
                cartProductsList.push(item);
            });
        }


        renderCartProducts(cartProductsList);
    });
}



function translateBrand(brand) {
    switch (brand) {
      case 'cocochanel': return 'Coco Chanel';
      case 'dior': return 'Dior';
      case 'fentybeauty': return 'Fenty Beauty';
      case 'nars': return 'Nars';
    }
  }
const db = firebase.firestore();
const productsRef = db.collection('products');
const productsList = document.querySelector('.productslist');
const storageRef = firebase.storage().ref();
const usersRef = db.collection('users');
///////
const cartRef = db.collection('cart');


let productsAddCart= [];



function renderProducts(list) {
  productsList.innerHTML = '';

  list.forEach(function (elem) {
    const newProduct = document.createElement('article');

    newProduct.classList.add('product');

    const url = `productView.html?${elem.id}-${elem.name}`;
    //newProduct.setAttribute('href', url);

    newProduct.innerHTML = `
    <a href="${url}">
    <img class="product__img" src="" alt="product">
    <div> 
    <h3 class="product__name">${elem.name}</h3>
    <p class="product__brand">${translateBrand(elem.brand)}</p>
    <p class="product__type">${translateTypes(elem.type)}</p>
    <p class="product__color">${translateColor(elem.color)}</p>
    <p class="product__price">${elem.price}</p>
    <img class="product__icon" src="../Images/star.svg" alt="star"> 
    <span class="product__popularity">${elem.popularity}</span>
    </div> 
    </a>
    <button class="btnPrimary btnPrimary--shop">Comprar</button>`;



    //storage for imag
    if (elem.storageImgs && elem.storageImgs.length > 0) {
      console.log(elem.storageImgs);
      storageRef.child(elem.storageImgs[0]).getDownloadURL().then(function (url) {
        // Or inserted into an <img> element:
        var img = newProduct.querySelector('.product__img');
        img.src = url;
      }).catch(function (error) {
        // Handle any errors
      });
    }


    // add collection cart to firestore
    const addBtn = newProduct.querySelector('.btnPrimary--shop');

    function cartList(productsListProducts){
      console.log(productsListProducts);
      let productsArray = productsListProducts;
      if (userInfo) {
        const newShop = {
          name: elem.name,
          brand: elem.brand,
          price: Number(elem.price),
          image: elem.storageImgs[0],
        };
        
        productsArray.push(newShop);
        
        productCartList = {
          products: productsArray
        }
        
        cartRef.doc(userInfo.uid).set(productCartList).catch(function (error) {
          console.log(error);
        });
        
        console.log(productsArray)
      } else{
        console.log("ERROR CART LIST");
      }
    }

    function getCart() {
      console.log(userInfo.uid);
      cartRef
      .doc(userInfo.uid)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().products != undefined) {
          productsAddCart = doc.data().products;
          console.log(productsAddCart);
          productCartList = doc.data().products;
          cartList(productsAddCart);
        }else if(doc.exists && doc.data().products == undefined){
          cartList(productsAddCart);
        }else if(!doc.exists){
          cartList(productsAddCart);
        }
      }).catch(function (error) {
        console.log("error: ", error);
      });
    }
   
    addBtn.addEventListener('click', function () {

      if(userInfo) {
        getCart();

        /* const newShop = {
           name: elem.name,
           brand: elem.brand,
           price: Number(elem.price),
           image: elem.storageImgs[0],
         };
  
         productsAddCart.push(newShop);

           productCartList={
             products:productsAddCart
           }
        
           cartRef.doc(userInfo.uid).set(productCartList).catch(function(error){
             console.log(error);
           });*/
        /*
        //cartRef.doc(userInfo.uid).doc(elem.id).set(newShop).then(function (docRef 
        usersRef.doc(userInfo.uid).collection("cart").doc(elem.id).set(newShop).then(function (docRef) {
          //console.log("Document written with ID: ", docRef.id);
        }).catch(function (error) {
          console.error("Error adding document: ", error);
        });*/
  
        modalC.style.opacity = "1";
        modalC.style.visibility = "visible";
        modal.classList.toggle("modal__close");
      } else{
        console.log("DEBE REGISTRARSE");
        modalC2.style.opacity = "1";
        modalC2.style.visibility = "visible";
        modal2.classList.toggle("modal__close--error");
      }
     
     
    });


    
    productsList.appendChild(newProduct);
  });

  

  
}


let objectsList = [];
//función para traer los datos
function getProducts() {
  productsRef.get().then((querySnapshot) => {
    objectsList = [];
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      obj.id = doc.id;
      objectsList.push(obj);
      console.log(`${doc.id} =>${doc.data()}`);
    });
    renderProducts(objectsList);
    // orderProducts();

  });
}
getProducts();

// function getCart() {
//   cartRef
//     .doc(userInfo.uid)
//     .get()
//     .then((doc) => {
//       if(doc.exists){
//         productCartList = doc.data().products;
//       }
//     }).catch(function (error) {
//       console.log("hola: ", error);
//     });
// }





/*
//modal carrito
const modal = document.querySelector('.modal--full');
const modalC = document.querySelector('.modalContainer--full');
const shopBtn = document.querySelector('.btnPrimary--viewList');
const cartBtn = document.querySelector('.optionsBar__icons--shopping');
cartBtn.addEventListener("click", function () {
  modalC.style.opacity = "1";
  modalC.style.visibility = "visible";
  modal.classList.toggle("modal__close--full");
});
window.addEventListener("click", function (e) {
  // console.log(e.target);
  if (e.target == modalC) {
    modal.classList.toggle("modal__close--full");
    setTimeout(function () {
      modalC.style.opacity = "0";
      modalC.style.visibility = "hidden";
    }, 850);
  }
});*/

//Fonts select
//const selects =document.querySelectorAll('select');
//selectType.style.fontFamily="Montserrat", sans-serif;



/*
const selectSort = document.querySelector('.selectSort');
selectSort.style.fontFamily = "Montserrat";
function orderProducts() {
  var sort;
  selectSort.addEventListener('input', function () {
    sort = selectSort.value;
    //console.log (sort);
    switch (sort) {
      case 'sortAlphabetA':
        productsRef.orderBy('name').get()
          .then(function (querySnapshot) {
            const objects = [];
            querySnapshot.forEach(function (doc) {
              const obj = doc.data();
              obj.id = doc.id;
              objects.push(obj);
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              renderProducts(objects);
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
        break;
      case 'sortAlphabetZ':
        productsRef.orderBy('name', 'desc').get()
          .then(function (querySnapshot) {
            const objects = [];
            querySnapshot.forEach(function (doc) {
              const obj = doc.data();
              obj.id = doc.id;
              objects.push(obj);
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              renderProducts(objects);
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
        break;
      case 'sortPopularity':
        productsRef.orderBy('popularity', 'desc').get()
          .then(function (querySnapshot) {
            const objects = [];
            querySnapshot.forEach(function (doc) {
              const obj = doc.data();
              obj.id = doc.id;
              objects.push(obj);
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              renderProducts(objects);
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
        break;
      case 'sortLess':
        productsRef.orderBy('price').get()
          .then(function (querySnapshot) {
            const objects = [];
            querySnapshot.forEach(function (doc) {
              const obj = doc.data();
              obj.id = doc.id;
              objects.push(obj);
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              renderProducts(objects);
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
        break;
      case 'sortHigher':
        productsRef.orderBy('price', 'desc').get()
          .then(function (querySnapshot) {
            const objects = [];
            querySnapshot.forEach(function (doc) {
              const obj = doc.data();
              obj.id = doc.id;
              objects.push(obj);
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              renderProducts(objects);
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
        break;
    }
  });
}*/

const filterForm = document.querySelector('.filterform');
filterForm.addEventListener('input', function () {

  let copy = objectsList.slice();

  const order = filterForm.sort.value;
  //console.log(order);

  // renderProducts(objectsList);

  switch (order) {
    case 'sortLess':
      copy.sort(function (a, b) {
        return a.price - b.price;
      });
      break;
    case 'sortHigher':
      copy.sort(function (a, b) {
        return b.price - a.price;
      });
      break;

    case 'sortAlphabetA':
      copy.sort(function (a, b) {
        return a.name.localeCompare(b.name);

      });
      break;
    case 'sortAlphabetZ':
      copy.sort(function (a, b) {
        // return b.name.toLowerCase () - a.name.toLowerCase ();
        // return b.name - a.name;
        return b.name.localeCompare(a.name);
      });
      break;

    case 'sortPopularity':
      copy.sort(function (a, b) {
        return b.popularity - a.popularity;
      });
      break;

  }

  //filters
  //type
  const typeFilter = filterForm.typeproduct.value;
  //console.log(typeFilter);
  if (typeFilter != '') {

    copy = copy.filter(function (elem) {

      if (typeFilter == elem.type) {
        return true;
      }

      return false;
    })
  }

  //color
  const colorFilter = filterForm.color.value;
  //console.log(colorFilter);
  if (colorFilter != '') {

    copy = copy.filter(function (elem) {

      if (colorFilter == elem.color) {
        return true;
      }

      return false;
    })
  }

  //brand

  const brandFilter = filterForm.brand.value;
  //console.log(colorFilter);
  if (brandFilter != '') {

    copy = copy.filter(function (elem) {

      if (brandFilter == elem.brand) {
        return true;
      }

      return false;
    })
  }

  renderProducts(copy);
});

function translateTypes(type) {
  switch (type) {
    case 'lipstick': return 'Labial';
    case 'liquidlipsticks': return 'Labial líquido';
    case 'lipgloss': return 'Brillo labial';
  }
}

function translateColor(color) {
  switch (color) {
    case 'beige': return 'Beige';
    case 'pink': return 'Rosado';
    case 'red': return 'Rojo';
    case 'magenta': return 'Magenta';
  }
}

function translateBrand(brand) {
  switch (brand) {
    case 'cocochanel': return 'Coco Chanel';
    case 'dior': return 'Dior';
    case 'fentybeauty': return 'Fenty Beauty';
    case 'nars': return 'Nars';
  }
}
//modal cart
const modal = document.querySelector('.modal');
const modalC = document.querySelector('.modalContainer');
const viewCartBtn = document.querySelector('.btnPrimary--viewCart');
const closeBtn = document.querySelector('.close');


closeBtn.addEventListener("click", function () {
  modal.classList.toggle("modal__close");

  setTimeout(function () {
      modalC.style.opacity = "0";
      modalC.style.visibility = "hidden";
  }, 850);

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

viewCartBtn.addEventListener("click", function () {

  window.location.href = "./cart.html";
});

//modal error 
const modal2 = document.querySelector('.modal--error');
const modalC2 = document.querySelector('.modalContainer--error');
const goLoginBtn = document.querySelector('.btnPrimary--goLogin');
const close2Btn = document.querySelector('.close--error');


close2Btn.addEventListener("click", function () {
  modal2.classList.toggle("modal__close--error");

  setTimeout(function () {
    modalC2.style.opacity = "0";
    modalC2.style.visibility = "hidden";
  }, 850);

});

window.addEventListener("click", function (e) {

  console.log(e.target);
  if (e.target == modalC2) {
    modal2.classList.toggle("modal__close--error");

      setTimeout(function () {
        modalC2.style.opacity = "0";
        modalC2.style.visibility = "hidden";
      }, 850);
  }
});

goLoginBtn.addEventListener("click", function () {

  window.location.href = "./login.html";
});
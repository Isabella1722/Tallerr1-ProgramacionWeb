const db = firebase.firestore();
const productsRef = db.collection('products');
const productsList = document.querySelector('.productslist');
var storageRef = firebase.storage().ref();

function renderProducts(list) {
    productsList.innerHTML = '';

    list.forEach(function (elem) {
        const newProduct = document.createElement('a');

        newProduct.classList.add('product');

        const url = `productView.html?${elem.id}-${elem.name}`;
        newProduct.setAttribute('href', url);

        newProduct.innerHTML = `
        <img class="product__img" src="${elem.img}" alt="product">
        <h3 class="product__name">${elem.name}</h3>
        <p class="product__brand">${elem.brand}</p>
        <p class="product__type">${elem.type}</p>
        <p class="product__color">${elem.color}</p>
        <p class="product__price">${elem.price}</p>
        <img class="product__icon" src="../Images/star.svg" alt="star"> 
        <span class="product__popularity">${elem.popularity}</span>
        <button class="btnPrimary btnPrimary--shop">Comprar</button>`;



        if (elem.storageImgs && elem.storageImgs.length >0) {
            console.log(elem.storageImgs);
            storageRef.child(elem.storageImgs[0]).getDownloadURL().then(function (url) {
                // Or inserted into an <img> element:
                var img = newProduct.querySelector('.product__img');
                img.src = url;
            }).catch(function (error) {
                // Handle any errors
            });
        }
        productsList.appendChild(newProduct);
    });
}

//función para traer los datos
function getProducts() {
    productsRef.get().then((querySnapshot) => {
        const objects = [];
        querySnapshot.forEach((doc) => {
            const obj = doc.data();
            obj.id = doc.id;
            objects.push(obj);
            console.log(`${doc.id} =>${doc.data()}`);
        });
        renderProducts(objects);
    });
}
getProducts();




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
var storageRef = firebase.storage().ref();

window.addEventListener('load', function () {

  console.log(location.search);

  // partimos el location con el separador -
  const parts = location.search.split('-');
  // usamos la primer parte y la limpiamos
  const uid = parts[0].replace('?', '');

  // referencia a la base de datos
  const db = firebase.firestore();
  // referencia a la coleción productos
  const productsRef = db.collection('products');

  //referencia al producto 
  productsRef.doc(uid)
    .get() // traer info de ese producto
    .then(function (snapshot) {

      const product = snapshot.data();

      const name = document.querySelector('.productsInfo__title');
      name.innerText = product.name;

      const imgPrincipal = document.querySelector('.imgPrincipal');
      const img1 = document.querySelector('.productImg');
      const img2 = document.querySelector('.colorImg');
      const img3 = document.querySelector('.lipsImg');

      if (product.storageImgs && product.storageImgs.length > 0) {
        storageRef.child(product.storageImgs[0]).getDownloadURL().then(function (url) {
            img1.src = url;
            imgPrincipal.src =url;
        }).catch(function (error) {
            // Handle any errors
        });

        storageRef.child(product.storageImgs[1]).getDownloadURL().then(function (url) {
            img2.src = url;
        }).catch(function (error) {
            // Handle any errors
        });

        storageRef.child(product.storageImgs[2]).getDownloadURL().then(function (url) {
            img3.src = url;
        }).catch(function (error) {
            // Handle any errors
        });
    }
     /* storageRef.child(product.storageImgs[0]).getDownloadURL().then(function (url) {
        // Or inserted into an <img> element:
        var img = document.querySelector('.imgPrincipal');
        img.src = url;
    }).catch(function (error) {
        // Handle any errors
    });*/

  

    /*
      document.querySelector('.imgPrincipal').setAttribute('src', product.img1);
      document.querySelector('.productImg').setAttribute('src', product.img1);
      document.querySelector('.colorImg').setAttribute('src', product.img2);
      document.querySelector('.lipsImg').setAttribute('src', product.img3);*/

      document.querySelector('.productsInfo__price').innerText = product.price;
      document.querySelector('.productsInfo__type').innerText = translateTypes(product.type);
      document.querySelector('.productsInfo__brand').innerText = translateBrand(product.brand);
      document.querySelector('.productsInfo__color').innerText =translateColor(product.color);
      document.querySelector('.description__text').innerText = product.description;
      document.querySelector('.ingredients__text').innerText = product.ingredients;
     // document.querySelector('.gallery').classList.remove('hidden');
      //document.querySelector('.productsInfo').classList.remove('hidden');
    })

  console.log(uid);

 
   

});

const galleryImg = document.querySelector('.imgPrincipal');
const galleryItems = document.querySelectorAll('.gallery__items img');

function galleryHandle(event) {
  const src= event.target.getAttribute('src');
  galleryImg.setAttribute('src',src);
  console.log('click', src);
}
galleryItems.forEach(function (elem, index) {
  elem.addEventListener('click', galleryHandle);
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

function translateTypes (type) {
  switch(type){
    case 'lipstick': return 'Labial';
    case 'liquidlipsticks': return 'Labial líquido';
    case 'lipgloss': return 'Brillo labial';
  }
}

function translateColor (color) {
  switch(color){
    case 'beige': return 'Beige';
    case 'pink': return 'Rosado';
    case 'red': return 'Rojo';
    case 'magenta': return 'Magenta';
  }
}

function translateBrand (brand) {
  switch(brand){
    case 'cocochanel': return 'Coco Chanel';
    case 'dior': return 'Dior';
    case 'fentybeauty': return 'Fenty Beauty';
    case 'nars': return 'Nars';
  }

}
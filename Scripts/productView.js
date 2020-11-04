
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

      document.querySelector('.productImg').setAttribute('src', product.img);
      document.querySelector('.productsInfo__price').innerText = product.price;
      document.querySelector('.productsInfo__type').innerText = product.type;
      document.querySelector('.productsInfo__brand').innerText = product.brand;
      document.querySelector('.productsInfo__color').innerText = product.color;
      document.querySelector('.gallery').classList.remove('hidden');
      document.querySelector('.productsInfo').classList.remove('hidden');
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
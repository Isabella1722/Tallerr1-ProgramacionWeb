
const shopBtn = document.querySelector('.viewProducts');
const cartBtn = document.querySelector('.optionsBar__icons--shopping');
const viewCartBtn = document.querySelector('.viewCart');


shopBtn.addEventListener("click", function () {
  window.location.href = '/Html/products.html';

});

cartBtn.addEventListener("click", function () {
  window.location.href = '/Html/cart.html';

});

viewCartBtn.addEventListener("click", function () {

  window.location.href = '/Html/cart.html';
});


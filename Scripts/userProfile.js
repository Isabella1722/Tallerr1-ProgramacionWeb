//modal carrito
const modal = document.querySelector('.modal--vertical');
const modalC = document.querySelector('.modalContainer--vertical');
const shopBtn = document.querySelector('.btnPrimary--viewList');
const cartBtn = document.querySelector('.optionsBar__icons--shopping');
const viewCartBtn = document.querySelector('.viewCart');


cartBtn.addEventListener("click", function () {
  modalC.style.opacity = "1";
  modalC.style.visibility = "visible";
  modal.classList.toggle("modal__close--vertical");

});

viewCartBtn.addEventListener("click", function () {
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

//Carrousel
const carrouselRight = document.querySelector('.carrousel__right');
const carrouselLeft = document.querySelector('.carrousel__left');
const carrouselStripe = document.querySelector('.carrousel__stripe');
let current = 0;

carrouselRight.addEventListener('click', function () {
  current++;
  if (current >= carrouselStripe.children.length) {
    current = 0;
  }
  const width = carrouselStripe.clientWidth;
  carrouselStripe.style.transform = 'translate(-' + (width * current) + 'px, 0px)';
});

carrouselLeft.addEventListener('click', function () {
  current--;
  if (current <= 0) {
    current = 0;
  }
  const width = carrouselStripe.clientWidth;
  carrouselStripe.style.transform = 'translate(+' + (width * current) + 'px, 0px)';
});



//Slider
const slider = document.querySelector('.interaction__input');
const img = document.querySelector('.interaction__slider img:last-child');

function handleSlider() {

  img.style.width = (slider.value * 100) + '%';
}
slider.addEventListener('input', handleSlider);

//Banner
const banner = document.querySelector('.banner');
var image1 = 'url(../Images/WomanBanner1.jpg)';
var image2 = 'url(../Images/WomanBanner2.jpg)';
window.setInterval(function () {

  if (banner.classList.contains('bannerImg2')) {
    banner.classList.remove('bannerImg2');
  } else {
    banner.classList.add('bannerImg2');
  }
}, 5000);


//Botones
const btnViewProducts = document.querySelector('.btnPrimary');

btnViewProducts.addEventListener("click", function () {
  window.location.href = "./Html/products.html";
});


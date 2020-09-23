
//Carrousel
const carrouselRight = document.querySelector('.carrousel__right');
const carrouselStripe = document.querySelector('.carrousel__stripe');
let current = 0;

carrouselRight.addEventListener('click',function() {
    current++;
    if(current >= carrouselStripe.children.length) {
        current = 0;
    }
    const width = carrouselRight.clientWidth;
    carrouselStripe.style.transform = 'translate(-' + (width * current) + 'px, 0px)';  
});


//Slider
const slider = document.querySelector('.interaction__input');
const img = document.querySelector('.interaction__slider img:last-child');

function handleSlider () {
  
  img.style.width = (slider.value * 100) + '%';
}
slider.addEventListener('input', handleSlider);
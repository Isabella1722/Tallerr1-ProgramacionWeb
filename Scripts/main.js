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
const products = [




    {
        title:'Rouge Allure Velvet',
        img:'../Images/LipstickPromo.jpg',
        brand:'Coco Chanel',
        type:'Labial',
        color:'Rojo',
        price:'$150.000',

    },

    {
        title:'holis',
        img:'../Images/LipHydratingCoco.jpg',
        brand:'Coco ',
        type:'La',
        color:'Ro',
        price:'$150',

    },

    {
        title:'holis',
        img:'../Images/LipHydratingCoco.jpg',
        brand:'Coco ',
        type:'La',
        color:'Ro',
        price:'$150',

    },
    {
        title:'holis',
        img:'../Images/LipHydratingCoco.jpg',
        brand:'Coco ',
        type:'La',
        color:'Ro',
        price:'$150',

    }, 
     {
        title:'holis',
        img:'../Images/LipHydratingCoco.jpg',
        brand:'Coco ',
        type:'La',
        color:'Ro',
        price:'$150',

    },
    {
        title:'holis',
        img:'../Images/LipHydratingCoco.jpg',
        brand:'Coco ',
        type:'La',
        color:'Ro',
        price:'$150',

    },



];

const productsList = document.querySelector('.productslist');

products.forEach (function(elem){
    const newProduct= document.createElement('article');

    newProduct.classList.add('product');
    newProduct.innerHTML = `<img class="product__img" src="${elem.img}" alt="product">
    <h3 class="product__title">${elem.title}</h3>
    <p class="product__brand">${elem.brand}</p>
    <p class="product__type">${elem.type}</p>
    <p class="product__color">${elem.color}</p>
    <p class="product__price">${elem.price}</p>
    <button class="btnPrimary btnPrimary--shop">Comprar</button>`;
    productsList.appendChild(newProduct);



});

//console.log(newProduct);
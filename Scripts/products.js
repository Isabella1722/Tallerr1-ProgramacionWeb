const db = firebase.firestore();
const productsRef = db.collection('products');
const productsList = document.querySelector('.productslist');

function renderProducts(list) {
    productsList.innerHTML = '';

    list.forEach(function (elem) {
        const newProduct = document.createElement('article');

        newProduct.classList.add('product');
        newProduct.innerHTML = `
        <img class="product__img" src="${elem.img}" alt="product">
        <h3 class="product__name">${elem.name}</h3>
        <p class="product__brand">${elem.brand}</p>
        <p class="product__type">${elem.type}</p>
        <p class="product__color">${elem.color}</p>
        <p class="product__price">${elem.price}</p>
        <button class="btnPrimary btnPrimary--shop">Comprar</button>`;

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


/*
//form
const form = document.querySelector('.form');
console.log(form);

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const newProduct = {
        name: form.namep.value,
        img: form.image.value,
        brand: form.brand.value,
        type: form.typeproduct.value,
        color: form.color.value,
        price: form.price.value
    }

    //subir a la base de datos
    productsRef.add(newProduct).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        getProducts();
        form.name.value='';
        form.namep.value='';
        form.image.value='';
        form.brand.value='';
        form.typeproduct.value='';
        form.color.value='';
        form.price.value='';
    })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

});*/
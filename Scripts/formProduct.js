
const db = firebase.firestore();
const productsRef = db.collection('products');




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



    //parte de editar
    /*
    function handleThen(docRef) {
        form.name.value = '';
        form.namep.value = '';
        form.image.value = '';
        form.brand.value = '';
        form.typeproduct.value = '';
        form.color.value = '';
        form.price.value = '';
        selectItem = null;
    }

    function handleCatch(error) {
        console.error("Error adding document: ", error);
    }


    if (selectItem) {
        //si existe selectItem quiere decir que es porque va a editar
        productsRef.doc(selectItem.id).set(newProduct)
            .then(handleThen)
            .catch(handleCatch);
    } else {
        //sino es porque agregará un nuevo producto
        productsRef.add(newProduct)
            .then(handleThen)
            .catch(handleCatch);

    }


   */


    //subir a la base de datos
    productsRef.add(newProduct).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        //getProducts();
        form.name.value = '';
        form.namep.value = '';
        form.image.value = '';
        form.brand.value = '';
        form.typeproduct.value = '';
        form.color.value = '';
        form.price.value = '';
    })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

});





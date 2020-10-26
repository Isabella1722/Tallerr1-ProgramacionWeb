
const db = firebase.firestore();
const productsRef = db.collection('products');
let selectItem = null;
const storage = window.localStorage;
const selectItemtorage = storage.getItem("selectItemtorage");
selectItem = selectItemtorage;
console.log(selectItem);


//form
const form = document.querySelector('.form');
console.log(form);

//Con esto se trae la información del elemento al que le dimos editar anteriormente
productsRef.doc(selectItem).get().then(function(doc) {

    if (doc.exists) {
        elem = doc.data();
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    form.namep.value = elem.name;
    form.image.value = elem.img;
    form.brand.value = elem.brand;
    form.typeproduct.value = elem.type;
    form.color.value = elem.color;
    form.price.value = elem.price;
    form.description.value = elem.description;
    form.ingredients.value = elem.ingredients;

   // form.imageFile.value = elem.imageFile;

}).catch(function(error) {
    console.log("Error getting document:", error);
});

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const editProduct = {
        name: form.namep.value,
        img: form.image.value,
        brand: form.brand.value,
        type: form.typeproduct.value,
        color: form.color.value,
        price: form.price.value,
        description: form.description.value,
        ingredients: form.ingredients.value
        //imageFile: form.imageFile.value
    }

    //parte de editar
    
    function handleThen(docRef) {
        form.namep.value = '';
        form.image.value = '';
        form.brand.value = '';
        form.typeproduct.value = '';
        form.color.value = '';
        form.price.value = '';
        form.description.value = '';
        form.ingredients.value = '';
       // form.imageFile.value = '';
        selectItem = null;
    }

    function handleCatch(error) {
        console.error("Error adding document: ", error);
    }


    if (selectItem) {
        //si existe selectItem quiere decir que es porque va a editar
        productsRef.doc(selectItem).set(editProduct)
            .then(handleThen)
            .catch(handleCatch);
    }

});





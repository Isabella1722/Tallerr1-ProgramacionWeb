
const db = firebase.firestore();
const productsRef = db.collection('products');

const saveBtn = document.querySelector('.btnPrimary--saveproduct');
const closeBtn = document.querySelector('.close');
const modal = document.querySelector('.modal');
const modalC = document.querySelector('.modalContainer');
const viewBtn = document.querySelector('.btnPrimary--viewList');


//form
const form = document.querySelector('.formAdd');
console.log(form);

form.addEventListener('submit', function (event) {
    event.preventDefault();


    //image
    var storageRef = firebase.storage().ref();

    // Create a reference to 'mountains.jpg'
    var newImageRef = storageRef.child(`products/${Math.floor(Math.random() * 123152194192)}.jpg`);

    var file = form.imageFile.files[0]; // use the Blob or File API
    newImageRef.put(file).then(function (snapshot) {
        console.log(snapshot)
        console.log('Uploaded a blob or file!');
    });
    
    const newProduct = {
        name: form.namep.value,
        img: form.image.value,
        brand: form.brand.value,
        type: form.typeproduct.value,
        color: form.color.value,
        price: form.price.value,
        description: form.description.value,
        ingredients: form.ingredients.value
    }

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
        form.description.value = '';
        form.ingredients.value = '';
    })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

    modalC.style.opacity = "1";
    modalC.style.visibility = "visible";
    modal.classList.toggle("modal__close");
});


/*
saveBtn.addEventListener("click", function (e) {

    e.preventDefault();
    modalC.style.opacity = "1";
    modalC.style.visibility = "visible";
    modal.classList.toggle("modal__close");
    
});*/

closeBtn.addEventListener("click", function () {
    modal.classList.toggle("modal__close");

    setTimeout(function () {
        modalC.style.opacity = "0";
        modalC.style.visibility = "hidden";
    }, 850);

});

window.addEventListener("click", function (e) {

    console.log(e.target);
    if (e.target == modalC) {
        modal.classList.toggle("modal__close");

        setTimeout(function () {
            modalC.style.opacity = "0";
            modalC.style.visibility = "hidden";
        }, 850);
    }
});

viewBtn.addEventListener("click", function () {

    window.location.href = "/Html/productsAdmin.html";
});
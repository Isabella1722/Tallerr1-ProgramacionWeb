
const db = firebase.firestore();
const productsRef = db.collection('products');
let selectItem = null;
const storage = window.localStorage;
const selectItemtorage = storage.getItem("selectItemtorage");
selectItem = selectItemtorage;
console.log(selectItem);

var storageRef = firebase.storage().ref();

//arreglo de los inputs
var imagePaths = [];

//modal
const closeBtn = document.querySelector('.close');
const modal = document.querySelector('.modal');
const modalC = document.querySelector('.modalContainer');
const viewBtn = document.querySelector('.btnPrimary--viewList');

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
    //form.image.value = elem.img;
    form.brand.value = elem.brand;
    form.typeproduct.value = elem.type;
    form.color.value = elem.color;
    form.price.value = elem.price;
    form.popularity.value = elem.popularity;
    form.description.value = elem.description;
    form.ingredients.value = elem.ingredients;

   // form.imageFile.value = elem.imageFile;

}).catch(function(error) {
    console.log("Error getting document:", error);
});
//INPUT FILE***********************************
const images = form.querySelectorAll('.form__imginput');

images.forEach(function(input, index){
    
    input.addEventListener('change', function(){
        console.log("holis");
        // Create a reference 
        var newImageRef = storageRef.child(`products/${Math.floor(Math.random() * 123152194192)}.jpg`);
      
        var file = input.files[0]; // use the Blob or File API
        newImageRef.put(file).then(function (snapshot) {
            console.log(snapshot)
            console.log('Uploaded a blob or file!');
            imagePaths[index] = snapshot.metadata.fullPath;
        });
      });
});
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const editProduct = {
        name: form.namep.value,
        //img: form.image.value,
        brand: form.brand.value,
        type: form.typeproduct.value,
        color: form.color.value,
        price: Number(form.price.value),
        popularity: Number(form.popularity.value),
        description: form.description.value,
        ingredients: form.ingredients.value,
        storageImgs: imagePaths
        //imageFile: form.imageFile.value
    }

    //parte de editar
    
    function handleThen(docRef) {
        form.namep.value = '';
       // form.image.value = '';
        form.brand.value = '';
        form.typeproduct.value = '';
        form.color.value = '';
        form.price.value = '';
        form.popularity.value = '';
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

    modalC.style.opacity = "1";
    modalC.style.visibility = "visible";
    modal.classList.toggle("modal__close");
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


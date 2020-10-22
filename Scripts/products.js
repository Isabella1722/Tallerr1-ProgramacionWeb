var firebaseConfig = {
    apiKey: "AIzaSyC8Yb_0ZkllVmjzKfJbFuckaAcNsFkxLaM",
    authDomain: "beuty-lips.firebaseapp.com",
    databaseURL: "https://beuty-lips.firebaseio.com",
    projectId: "beuty-lips",
    storageBucket: "beuty-lips.appspot.com",
    messagingSenderId: "86523978778",
    appId: "1:86523978778:web:9db31e69ea328cc8c51da3",
    measurementId: "G-GYTTLJ774M"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 var db = firebase.firestore();


const products = [




    {
        name:'Rouge Allure Velvet',
        img:'../Images/LipstickPromo.jpg',
        brand:'Coco Chanel',
        type:'Labial',
        color:'Rojo',
        price:'$150.000',

    },

    {
        name:'holis',
        img:'../Images/LipHydratingCoco.jpg',
        brand:'Coco ',
        type:'La',
        color:'Ro',
        price:'$150',

    },

    {
        name:'holis',
        img:'../Images/LipHydratingCoco.jpg',
        brand:'Coco ',
        type:'La',
        color:'Ro',
        price:'$150',

    },
    {
        name:'holis',
        img:'../Images/LipHydratingCoco.jpg',
        brand:'Coco ',
        type:'La',
        color:'Ro',
        price:'$150',

    }, 
     {
        name:'holis',
        img:'../Images/LipHydratingCoco.jpg',
        brand:'Coco ',
        type:'La',
        color:'Ro',
        price:'$150',

    },
    {
        name:'holis',
        img:'../Images/LipHydratingCoco.jpg',
        brand:'Coco ',
        type:'La',
        color:'Ro',
        price:'$150',

    },



];

const productsList = document.querySelector('.productslist');

function renderProducts(list){
    productsList.innerHTML ='';

   list.forEach (function(elem){
    const newProduct= document.createElement('article');

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
//render inicial con todos los productos
//renderProducts(products);




var objects =[];
//función para traer los datos
function getProducts(){

    
    db.collection("products").get().then((querySnapshot)=>{
            
            
            objects.splice(0,objects.length);
            querySnapshot.forEach((doc)=>{
            const obj = doc.data();
            obj.id= doc.id;
            objects.push(obj);
            console.log(`${doc.id} =>${doc.data()}`);
        });

        renderProducts(objects);
    });


}
getProducts();



//form
const form= document.querySelector('.form');
console.log(form);

form.addEventListener('submit', function(event){
    event.preventDefault();

    const newProduct ={
        name: form.namep.value,
        img: form.image.value,
        brand:form.brand.value,
        type:form.typeproduct.value,
        color:form.color.value,
        price:form.price.value
    }

    //subir a la base de datos
    db.collection("products").add(newProduct)
    .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
    console.error("Error adding document: ", error);
    });

    getProducts();
    //renderProducts(products);
});





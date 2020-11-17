const db = firebase.firestore();
const cartRef = db.collection('cart');
const orderRef = db.collection('orders');

const formOrder = document.querySelector('.formOrder');
const payBtn = document.querySelector('.btnPrimary--payShop');

ordersList = [];
let ordersArray;




formOrder.addEventListener('submit', function(event){
    event.preventDefault();

    

    const newOrder = {

        fullName: formOrder.namep.value,
        address: formOrder.address.value,
        identification: formOrder.identification.value,
        cardNumber: Number(formOrder.numberCard.value),
        cardType: formOrder.card.value,
        totalValue:value.price,
        quantity:quantity,
        
       
        
       
        
      };

      
        ordersListC = {
        ordersInformation: newOrder,
        orders: ordersArray,
      }
      
      
      orderRef.add(ordersListC).then().catch(function (error) {
        console.error("Error adding document: ", error);
      });

      

      modalC.style.opacity = "1";
        modalC.style.visibility = "visible";
        modal.classList.toggle("modal__close");
})


function getCartOrders() {
    orderRef
      .doc(userInfo.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
            ordersList = doc.data().orders;
        }
      }).catch(function (error) {
        console.log("error: ", error);
      });
  }

function getOrder(){
    cartRef.doc(userInfo.uid).get().then((doc) => {
        if(doc.exists){
            doc.data().products.forEach (function (item) {
                ordersArray=doc.data();
            });
        }
      });
}

let value;

function getValue(){
    cartRef.doc(userInfo.uid).get().then((doc)=>{

        if(doc.exists){
    
            value= doc.data().products.reduce(function(pastValue, newValue){
                return{
                    price:pastValue.price+newValue.price,
                }
            });
    
            document.querySelector('.order__totalO').innerHTML= value.price;
        }
    });
}

const quantityP = document.querySelector('.order__totalProductsO');
let quantity ;
function getQuantityProducts(){


    cartRef.doc(userInfo.uid).get().then((doc) => {
       
        if (doc.exists) {
            quantityP.innerText = doc.data().products.length;
            quantity= doc.data().products.length;
        }


  
    });
   
}


function getDeleteShop(){

  cartRef.doc(userInfo.uid).delete().then(function(){

    console.log("Document successfully delected!");
  })
  .catch(function(error){
    console.log("Error removing document: ", error);
  });

}


//modal
const modal = document.querySelector('.modal');
const modalC = document.querySelector('.modalContainer');
const returnBtn = document.querySelector('.btnPrimary--return');
const closeBtn = document.querySelector('.close');


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

returnBtn.addEventListener("click", function () {

  window.location.href = "./products.html";
});
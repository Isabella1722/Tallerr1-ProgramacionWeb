const db = firebase.firestore();
const orderRef = db.collection('orders');

const orderList = document.querySelector('.orderList');

function renderOrdersList(list) {
    orderList.innerHTML = '';
    list.forEach(function (elem, i) {
        const newOrderObj = document.createElement('section');
        newOrderObj.classList.add('orderListItem');

        newOrderObj.innerHTML = `
        
        <div class="orderListItem__imgContainer">
                <img class="orderListItem__img" src="../Images/userOrder.svg" alt="user">
            </div>

            <div class="orderListItem__info">
                <h3 class="orderListItem__name">${elem.fullName}</h3>
                <h4 class="orderListItem__shop">Dirección: <span class="orderListItem__adress">${elem.address}</span></h4>
                <h4 class="orderListItem__shop">Cantidad productos: <span class="orderListItem__quantity">${elem.quantity}</span></h4>
                <h4 class="orderListItem__shop">Total de compra: <span class="orderListItem__value">${elem.totalValue}</span></h4>
                <h4 class="orderListItem__shop">Código del pedido: <span class="orderListItem__id">${elem.id}</span></h4>
            </div>

            
              `;

        orderList.appendChild(newOrderObj);
    });

    const quantityO = document.querySelector('.orderList__totalOrders');
    quantityO.innerHTML=list.length;

}

let orderListP = [];
function getOrdersInformation() {
    orderRef.get().then((querySnapshot) => {
        orderListP = [];
        querySnapshot.forEach((doc) => {
            const obj = doc.data().ordersInformation;
            orderListP.push(obj);
            console.log(`${doc.id} => ${doc.data().ordersInformation}`);
        });
        renderOrdersList(orderListP);
    });
}

getOrdersInformation();





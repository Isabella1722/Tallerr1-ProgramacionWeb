

window.addEventListener('load', function () {

    const finalBtn = document.querySelector('.btnPrimary--pay');
    const shoppingBtn = document.querySelector('.btnPrimary--then');

    if (finalBtn) {
        finalBtn.addEventListener("click", function () {
            window.location.href = "../Html/order.html";
        });

    }

    firebase.auth().onAuthStateChanged(function (user) {
        console.log(user);
        if (user) {
            // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada
            const userId = user.uid;
            console.log("USUARIO" + userId);


        }
    });

    const lessBtn = document.querySelector('.orderProduct__less');
    let amount = document.querySelector('.orderProduct__amount');
    const addBtn = document.querySelector('.orderProduct__add');

   

    let cant=1;

    lessBtn.addEventListener('click', function () {
        if (cant > 0) {
            cant--;
            amount.innerText=cant;
        }

    });


    addBtn.addEventListener('click', function () {
        if (cant >0) {
            cant++;
            amount.innerText=cant;
        }

    });
});


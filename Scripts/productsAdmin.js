const db = firebase.firestore();
const productsRef = db.collection('products');
const productsList = document.querySelector('.productslistadmin');
const selectColor = document.querySelector('.color');
const storage = window.localStorage;
var storageRef = firebase.storage().ref();


function renderProducts(list) {
    productsList.innerHTML = '';

    list.forEach(function (elem) {

        const newProduct = document.createElement('article');
        //para traer solo el primero
        if (elem.storageImgs && elem.storageImgs.length > 0) {
            console.log(elem.storageImgs);
            storageRef.child(elem.storageImgs[0]).getDownloadURL().then(function (url) {
                // Or inserted into an <img> element:
                var img = newProduct.querySelector('.product__img');
                img.src = url;
            }).catch(function (error) {
                // Handle any errors
            });
        }
        newProduct.classList.add('product--admin');
        const url = `productView.html?${elem.id}-${elem.name}`;
        //newProduct.setAttribute('href', url);
        newProduct.innerHTML = `
        
        <img class="product__delete"src="../Images/delete.png" alt="delete">
        <a href="${url}">
        
        <img class="product__img" src="" alt="product">
        <div> 
        <h3 class="product__name">${elem.name}</h3>
        <p class="product__brand">${translateBrand(elem.brand)}</p>
        <p class="product__type">${translateTypes(elem.type)}</p>
        <p class="product__color">${translateColor(elem.color)}</p>
        <p class="product__price">${elem.price}</p>
        <img class="product__icon" src="../Images/star.svg" alt="star"> 
        <span class="product__popularity">${elem.popularity}</span>
        </div> 
        </a>
        <button class="btnPrimary btnPrimary--edit">Editar</button>`
            ;



        /*
        para todo el arreglo
                if(elem.storageImgs) {
                
                    elem.storageImgs.forEach(function(imageRef){
                        storageRef.child(imageRef).getDownloadURL().then(function(url) {
                            // Or inserted into an <img> element:
                            var img = newProduct.querySelector('img');
                            img.src = url;
                          }).catch(function(error) {
                            // Handle any errors
                          });
                    });
                      
                    
                  }*/

        //Delete
        const deleteBtn = newProduct.querySelector('.product__delete');
        deleteBtn.addEventListener('click', function () {
            productsRef.doc(elem.id).delete()
                .then(function () {
                    getProducts();
                    console.log("Document successfully deleted!");
                }).catch(function (error) {
                    console.log("Error removing document: ", error);
                });


        });

        //Edit
        const editBtn = newProduct.querySelector('.btnPrimary--edit');
        editBtn.addEventListener('click', function () {

            /* form.namep.value= elem.namep;
             form.image.value= elem.image;
             form.brand.value= elem.brand;
             form.typeproduct.value= elem.typeproduct;
             form.color.value= elem.color;
             form.price.value= elem.price;
             selectItem = elem;
             storage.setItem("selectItemtorage", selectItem);*/
            console.log(elem.id);
            storage.setItem("selectItemtorage", elem.id);
            window.location.href = "/Html/editProduct.html";

        });







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








function translateTypes (type) {
    switch(type){
      case 'lipstick': return 'Labial';
      case 'liquidlipsticks': return 'Labial líquido';
      case 'lipgloss': return 'Brillo labial';
    }
  }

  function translateColor (color) {
    switch(color){
      case 'beige': return 'Beige';
      case 'pink': return 'Rosado';
      case 'red': return 'Rojo';
      case 'magenta': return 'Magenta';
    }
  }
  
  function translateBrand (brand) {
    switch(brand){
      case 'cocochanel': return 'Coco Chanel';
      case 'dior': return 'Dior';
      case 'fentybeauty': return 'Fenty Beauty';
      case 'nars': return 'Nars';
    }
  }
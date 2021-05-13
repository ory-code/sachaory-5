'use strict';
const id = new URL(document.location).searchParams.get('id');
const btnAddBasket = document.querySelector('#addToCart');
function getProduct() {
    return fetch(`http://localhost:3000/api/teddies/${id}`)
        .then((response) => response.json())
        .then((product) => product)
        .catch((error) => {
            alert("La connexion au serveur n'a pas pu être effectué.");
        });
}

function hydratePage(prod) {
    displayProduct(prod);
}

function displayProduct(product) {
    const templateElt = document.querySelector('#templateProduct');
    const cloneElt = document.importNode(templateElt.content, true);
    cloneElt.getElementById('productImage').src = product.imageUrl;
    cloneElt.getElementById('productName').textContent = product.name;
    cloneElt.getElementById('productPrice').textContent = `${product.price / 100}.00 €`;
    cloneElt.getElementById('productDescription').textContent =product.description;
    cloneElt.getElementById('productColorsOption').textContent = product.colors;
    document.getElementById('productsList').appendChild(cloneElt);
}

const saveProductToLocalStorage = (product) => {
    if (!localStorage.getItem('basket')) {
        localStorage.setItem('basket', JSON.stringify([product]));
    } else {
        const cart = JSON.parse(localStorage.getItem('basket'));
        const productAlreadySelected = cart.filter(
            (prod) => prod.id === product.id
        );

        if (productAlreadySelected.length > 0) {
            productAlreadySelected[0].quantity++;
        } else {
            cart.push(product);
        }

        localStorage.setItem('basket', JSON.stringify(cart));
    }
};

(async () => {
    const teddy = await getProduct();
    hydratePage(teddy);
})();

btnAddBasket.addEventListener('click', async () => {
    // Destructuration de l'objet renvoyé par getProduct()
    let {
        _id,
        name,
        price
    } = await getProduct();
    const selectedTeddy = {
        id: _id,
        name: name,
        price: price,
        quantity: 1
    };

    saveProductToLocalStorage(selectedTeddy);
    

    alert('le produit a bien été ajouté au panier');
});
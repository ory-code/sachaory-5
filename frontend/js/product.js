'use strict';

const id = (new URL(document.location)).searchParams.get('id');

function getProduct() {
    return fetch(`https://ab-p5-api.herokuapp.com/api/teddies/${id}`)
        .then((response) => response.json())
        .then((product) => product)
        .catch((error) => {
            alert(
                "La connexion au serveur n'a pas pu être effectué."
            )
        })
}

function hydratePage(prod) {
    displayProduct(prod)
}

function displayProduct(product) {
    const templateElt = document.querySelector('#templateProduct')
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById('productImage').src = product.imageUrl
    cloneElt.getElementById('productName').textContent = product.name
    cloneElt.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
    cloneElt.getElementById('productDescription').textContent = product.description
    cloneElt.getElementById('productColorsOption').textContent = product.colors
    document.getElementById('productsList').appendChild(cloneElt)
}
//textContent = product.colors
const templateElt = document.querySelector('#templateProduct')
const btn = document.querySelector('#addToCart');
const lineName = document.querySelector('#name')
const lineQuantity = document.querySelector('#quantity')
const linePrice = document.querySelector('#price')

const saveProductToLocalStorage = (product) => {
    //créée une fonction qui va mettre au local storage

    if (localStorage.getItem('basket') == null) {
        localStorage.setItem('basket', JSON.stringify([product]))
    } else {
        //stocker produits dans une variable tout ce qui est dans le local storage
        let productStorage = localStorage.getItem('basket')
    }
    localStorage.setItem('basket', JSON.stringify([product]))
    //créée une deuxieme variable qui va contenir l'id du produit avec celui qui est dans le storage methode filter
}
//si la longeur du tableau du produit déjà sélectionner est supérieur à zéro augmente de 1 la quantité sinon else on ajoute dans le tableau

//après le dernier else on redefini le local storage comme la ligne 45 


(async () => {
    const teddy = await getProduct()
    hydratePage(teddy)
    btn.addEventListener('click', (event) => {
        //alert('le produit a bien été ajouté au panier')
        console.log();
        saveProductToLocalStorage(teddy)
    })
})()
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

const templateElt = document.querySelector('#templateProduct')
const btn = document.querySelector('#addToCart');
const lineName = document.querySelector('#name')
const lineQuantity = document.querySelector('#quantity')
const linePrice = document.querySelector('#price')

const saveProductToLocalStorage = (product) => {
    //créée une fonction qui va mettre 
    localStorage.setItem('basket', JSON.stringify(product))
}
btn.addEventListener('click', () => {
    alert ('le produit a bien été ajouté au panier')
    const monproduit = {nom:'Norber'}
    saveProductToLocalStorage(monproduit)
})



(async () => {
    const product = await getProduct()
    hydratePage(product)
})()
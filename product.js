//Page produit
let teddies;
const $teddiesProduct = document.querySelector('#product-teddies')
const lenses = document.createElement("select");
//Appel URL
const params = (new URL(document.location)).searchParams;
const id = params.get('id'); //Obtiens l'id du produit

//Appel de notre API
fetch("http://localhost:3000/api/teddies/" + id) //Rappel notre api + l'id de notre produit
    .then(async result_ => { //Récupère le tableau json 
        const result = await result_.json() //Donne un nom au tableau json récupéré
        teddies = result //Result deviens teddies
        //Appel de nos functions
        hydratePage()
    })
    .catch((error) => {
        console.log(error);
    })



function hydratePage(productsPara) {
    // Remove loading boxes
    document.getElementById('product-teddies').innerHTML = ''

     //Loop over all products and displays them
    productsPara.forEach((product) => {
        displayProduct(product)
    })
}

function hydratePage(product) {
    // Hydrate page with data
    document.getElementById('productImage').src = product.imageUrl
    document.getElementById('productName').textContent = product.name
    document.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
    document.getElementById('productDescription').textContent = product.description
    cloneElt.getElementById('productLink').href = `/products.html?id=${product._id}`
}

 // Display template
 document.getElementById('product-show')

 
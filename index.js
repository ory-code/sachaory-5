(async () => {
    const products = await getProducts()
    hydratePage(products)
  })()
  
  async function getProducts() {
    return fetch("http://localhost:3000/api/teddies")
      .then((httpBodyResponse) => httpBodyResponse.json())
      .then((products) => products)
      .catch((error) => {
        alert(
          "La connexion au serveur n'a pas pu être effectué."
        )
      })
  }
  
  function hydratePage(productsPara) {
    // Remove loading boxes
    document.getElementById('productsList').innerHTML = ''
  
    // Loop over all products and displays them
    productsPara.forEach((product) => {
      displayProduct(product)
    })
  }
  
  function displayProduct(product) {
    // Get template
    const templateElt = document.getElementById('product')
  
    // Clone template
    const cloneElt = document.importNode(templateElt.content, true)
  
    // Hydrate template
    cloneElt.getElementById('productImage').src = product.imageUrl
    cloneElt.getElementById('productName').textContent = product.name
    cloneElt.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
    cloneElt.getElementById('productDescription').textContent = product.description
    cloneElt.getElementById('productLink').href = `/product.html?id=${product._id}`
  
    // Display template
    document.getElementById('productsList').appendChild(cloneElt)
  }
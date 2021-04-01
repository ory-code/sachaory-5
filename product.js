
    (async () => {
        const productId = getProduct()
        const idData = id
        hydratePage()
      })()
  
  
  
  //Appel URL
  const id = (new URL(document.location)).searchParams.get('id'); 
  const getProduct = async () => {
      const response = await fetch(`http://localhost:3000/api/teddies/${id}`)
      const product = await response.json()
      return product
  }
  
  function hydratePage(product) {
      displayProduct(product)
  }
  function displayProduct(product) {
      // Get template
      const templateElt = document.getElementById('teddiesProduct')

      // Clone template
      const cloneElt = document.importNode(templateElt.content, true)

      // Hydrate template
      cloneElt.getElementById('productImage').src = product.imageUrl
      cloneElt.getElementById('productName').textContent = product.name
      cloneElt.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
      cloneElt.getElementById('productDescription').textContent = product.description
  }

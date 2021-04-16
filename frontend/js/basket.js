// const basketElt = (storage) => {
//     let nameProductElt = document.getElementById('nameStorage')
//     let quantityProductElt = document.getElementById('quantityStorage')
//     let priceProductElt = document.getElementById('priceStorage')
// }

const saveProductToLocalStorage = localStorage.getItem('basket')
//console.log(saveProductToLocalStorage);


const basketElt = document.getElementById('basketProduct')
if (saveProductToLocalStorage == null) {
    alert ('le panier est vide veuillez choisir un compagnon')
} else {

}
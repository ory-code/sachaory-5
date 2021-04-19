

// const saveProductToLocalStorage = localStorage.getItem('basket')
// console.log(saveProductToLocalStorage);


// const basketElt = document.getElementById('basketProduct')
// if (saveProductToLocalStorage == null) {
//     alert ('le panier est vide veuillez choisir un compagnon')
// } else {

// }
// Recuperer les données sur le LocalStorage
let productsJson = localStorage.getItem('basket');
let products = productsJson && JSON.parse(productsJson);

console.log(products);

if (!products || products.length === 0) {
    window.alert('le panier est vide veuillez choisir un compagnon');
    window.location.href="index.html";
}

function onPanier() {
    // Afficher les données sur la page Web Si les conditions du if sont remplies
    const container = document.querySelector('tbody');
    let template = document.querySelector('#productrow');
    let prixTotal = 0;


    for (const result of products) {
        
        let clone = document.importNode(template.content, true);
        let td = clone.querySelectorAll("td");

        // Prendre le prix total d'un article et additioner le prix total de tous les articles present 
        prixTotal = result.price * result.quantite / 100 + prixTotal;

        td[0].textContent = result.name;
        td[1].textContent = result.quantite;
        td[2].textContent = `${result.price / 100} €`;
        td[3].textContent = `${result.price * result.quantite / 100} €`;

        container.appendChild(clone);
    }

    let prixTotalDiv = document.querySelector(".prixtotal");
    prixTotalDiv.textContent = `${prixTotal} €`;


    //Placement de ma variable prixTotal dans le localStorage
    localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
}
onPanier();

//Bouton Vider le Panier
let btnSupp = document.querySelector('#btnsupp');

btnSupp.addEventListener("click", event => {
    localStorage.removeItem("article");
    window.location.href="index.html";
})
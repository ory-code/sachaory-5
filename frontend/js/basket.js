// Recuperer les données sur le LocalStorage
let productsData = JSON.parse(localStorage.getItem('basket'));

if (!productsData || productsData.length === 0) {
    window.alert('le panier est vide veuillez choisir un compagnon');
    window.location.href = "index.html";
}

function onPanier() {
    // Afficher les données sur la page Web Si les conditions du if sont remplies
    const container = document.querySelector('tbody');
    let template = document.querySelector('#productrow');
    let prixTotal = 0;


    for (const result of productsData) {
        console.log(result);
        let clone = document.importNode(template.content, true);
        let td = clone.querySelectorAll("td");

        // Prendre le prix total d'un article et additioner le prix total de tous les articles present 
        prixTotal = result.price * result.quantity / 100 + prixTotal;
        td[0].textContent = result.name;
        td[1].textContent = result.quantity;
        td[2].textContent = `${result.price / 100} €`;
        td[3].textContent = `${result.price * result.quantity / 100} €`;

        container.appendChild(clone);
    }

    let prixTotalDiv = document.querySelector(".prixtotal");
    prixTotalDiv.textContent = `${prixTotal} €`;

    //Placement de ma variable prixTotal dans le localStorage
    localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
}
onPanier();


// // Input validity
// watchValidity(document.getElementById('firstName'), (e) => e.target.value.length > 1)
// watchValidity(document.getElementById('lastName'), (e) => e.target.value.length > 1)
// watchValidity(document.getElementById('email'), (e) => {
//     const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
//     return emailRegex.test(e.target.value)
// })
// watchValidity(document.getElementById('address'), (e) => e.target.value.length > 6)
// watchValidity(document.getElementById('zipcode'), (e) => {
//     const zipcodeRegex = /[0-9]{4}(-[0-9]{4})?/
//     return zipcodeRegex.test(e.target.value)
// })
// watchValidity(document.getElementById('city'), (e) => e.target.value.length > 1)

// function watchValidity(elt, condition) {
//     elt.oninput = (e) => {
//         if (condition(e)) {
//             validInputElt(e.target)
//         } else {
//             neutralInputElt(e.target)
//         }
//     }
//     elt.onblur = (e) => {
//         if (!condition(e)) {
//             invalidInputElt(e.target)
//         }
//     }
// }

// function validInputElt(elt) {
//     elt.style.border = 'solid 1px green'
//     elt.style.boxShadow = '#00800066 0px 0px 4px'
// }

// function invalidInputElt(elt) {
//     elt.style.border = 'solid 1px red'
//     elt.style.boxShadow = 'rgba(128, 0, 0, 0.4) 0px 0px 4px'
// }

// function neutralInputElt(elt) {
//     elt.style.border = ''
//     elt.style.boxShadow = ''
// }



const btnOrderElt = document.querySelector('.btnOrder')
btnOrderElt.addEventListener('click', (event) => {
    event.preventDefault()
    const firstname = document.getElementById('firstName').value
    const lastname = document.getElementById('lastName').value
    const address = document.getElementById('address').value
    const email = document.getElementById('email').value
    const city = document.getElementById('city').value
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    // if ((
    //         firstname.length > 1 &&
    //         lastname.length > 1 &&
    //         emailRegex.test(email) &&
    //         address.length > 6 &&
    //         zipcodeRegex.test(zipcode) &&
    //         city.length > 1
    //     )) {
    //     alert("Veuillez remplir les champs correctements avant de procéder au paiement")
    //     return
    // }

    
    //faire une boucle for localstorage id avec push 
     let products = []
     for (products of productsData) {
         
     }
    
    const order = {
        contact: {
            firstName: firstname,
            lastName: lastname,
            address: address,
            city: city,
            email: email,
        },
        products
    }
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
    }
    fetch(`http://localhost:3000/api/teddies/order`, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            //window.location.href = `order.html`
        })
        .catch(() => {
            alert(error)
        })
})
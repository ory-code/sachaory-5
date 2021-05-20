// Recuperer les données sur le LocalStorage
let productsData = JSON.parse(localStorage.getItem('basket'));
let products = []
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
        let clone = document.importNode(template.content, true);
        let td = clone.querySelectorAll("td");
        // Prendre le prix total d'un article et additioner le prix total de tous les articles present 
        prixTotal = result.price * result.quantity / 100 + prixTotal;
        td[0].textContent = result.name;
        td[1].textContent = result.quantity;
        td[2].textContent = `${result.price / 100} €`;
        td[3].textContent = `${result.price * result.quantity / 100} €`;
        container.appendChild(clone);
        products.push(result.id)
    }
    let prixTotalDiv = document.querySelector(".prixtotal");
    prixTotalDiv.textContent = `${prixTotal} €`;
    //Placement de ma variable prixTotal dans le localStorage
    localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
}
onPanier();

// // Input validity
watchValidity(document.getElementById('firstName'), (e) => {
    const firstNameRegex = /^[a-z ,.'-]+$/i
    return firstNameRegex.test(e.target.value)
})
watchValidity(document.getElementById('lastName'), (e) => {
    const lastNameRegex = /^[a-z ,.'-]+$/i
    return lastNameRegex.test(e.target.value)
})
watchValidity(document.getElementById('email'), (e) => {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return emailRegex.test(e.target.value)
})
watchValidity(document.getElementById('address'), (e) => e.target.value.length > 6)
watchValidity(document.getElementById('city'), (e) => {
    const cityRegex = /^[a-z ,.'-]+$/i
    return cityRegex.test(e.target.value)
})

function watchValidity(elt, condition) {
    elt.oninput = (e) => {
        if (condition(e)) {
            validInputElt(e.target)
        } else {
            neutralInputElt(e.target)
        }
    }
    elt.onblur = (e) => {
        if (!condition(e)) {
            invalidInputElt(e.target)
        }
    }
}

function validInputElt(elt) {
    elt.style.border = 'solid 1px green'
    elt.style.boxShadow = '#00800066 0px 0px 4px'
}

function invalidInputElt(elt) {
    elt.style.border = 'solid 1px red'
    elt.style.boxShadow = 'rgba(128, 0, 0, 0.4) 0px 0px 4px'
}

function neutralInputElt(elt) {
    elt.style.border = ''
    elt.style.boxShadow = ''
}


//envoie donnée du formulaire 
const btnOrderElt = document.querySelector('.btnOrder')
btnOrderElt.addEventListener('click', (event) => {
    event.preventDefault()
    const firstName = document.getElementById('firstName').value
    const firstNameRegex = /^[a-z ,.'-]+$/i
    const lastName = document.getElementById('lastName').value
    const lastNameRegex = /^[a-z ,.'-]+$/i
    const address = document.getElementById('address').value
    const email = document.getElementById('email').value
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const city = document.getElementById('city').value
    const cityRegex = /^[a-z ,.'-]+$/i

    //condition d'envoie pour formulaire
    if (!(
            firstName.length > 1 &&
            firstNameRegex.test(firstName) &&
            lastName.length > 1 &&
            lastNameRegex.test(lastName) &&
            emailRegex.test(email) &&
            address.length > 6 &&
            city.length > 1 &&
            cityRegex.test(city) 
        )) {

        alert("Veuillez remplir les champs correctements avant de procéder au paiement")
        return
    }
    const order = {
        contact: {
            firstName: firstName,
            lastName: lastName,
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
            'Content-Type': 'application/json'
        },
    }
    fetch('http://localhost:3000/api/teddies/order', requestOptions)
        .then((response) => response.json())
        .then((response) => {
            let jsonOrder = JSON.stringify(response)
            localStorage.setItem('order', jsonOrder)
            window.location.href = 'order.html'
        })
        .catch(() => {
            alert(error)
        })
})
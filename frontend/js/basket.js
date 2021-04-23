// Recuperer les données sur le LocalStorage
let products = JSON.parse(localStorage.getItem('basket'));

if (!products || products.length === 0) {
    window.alert('le panier est vide veuillez choisir un compagnon');
    window.location.href = "index.html";
}

function onPanier() {
    // Afficher les données sur la page Web Si les conditions du if sont remplies
    const container = document.querySelector('tbody');
    let template = document.querySelector('#productrow');
    let prixTotal = 0;


    for (const result of products) {
        console.log(result);
        let clone = document.importNode(template.content, true);
        let td = clone.querySelectorAll("td");

        // Prendre le prix total d'un article et additioner le prix total de tous les articles present 
        prixTotal = result.price * result.quantite / 100 + prixTotal;

        td[0].textContent = result.name;
        td[1].textContent = result.quantite;
        td[2].textContent = `${result.price / 100} €`;
        td[3].textContent = `${result.price * result.quantite / 100}`;

        container.appendChild(clone);
    }

    let prixTotalDiv = document.querySelector(".prixtotal");
    prixTotalDiv.textContent = `${prixTotal} €`;

    //Placement de ma variable prixTotal dans le localStorage
    localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
}
onPanier();

function addEventListeners() {
    // Purchase button
    document.getElementById('orderBtn').onclick = (e) => {
        e.preventDefault()
        sendOrder()
    }
}

// Input validity
watchValidity(document.getElementById('firstName'), (e) => e.target.value.length > 1)
watchValidity(document.getElementById('lastName'), (e) => e.target.value.length > 1)
watchValidity(document.getElementById('email'), (e) => {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return emailRegex.test(e.target.value)
})
watchValidity(document.getElementById('address'), (e) => e.target.value.length > 6)
watchValidity(document.getElementById('zipcode'), (e) => {
    const zipcodeRegex = /[0-9]{5}(-[0-9]{4})?/
    return zipcodeRegex.test(e.target.value)
})
watchValidity(document.getElementById('city'), (e) => e.target.value.length > 1)

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

function sendOrder() {
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const adress = document.getElementById('adress').value
    const zipcode = document.getElementById('zipcode').value
    const email = document.getElementById('email').value
    const city = document.getElementById('city').value

    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const zipcodeRegex = /[0-9]{5}(-[0-9]{4})?/

    if (!(
            firstname.length > 1 &&
            lastname.length > 1 &&
            emailRegex.test(email) &&
            adress.length > 6 &&
            zipcodeRegex.test(zipcode) &&
            city.length > 1
        )) {
        alert("Veuillez remplir les champs correctements avant de procéder au paiement")
        return
    }
}

const requestOptions = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  }

  fetch(`${apiUrl}/api/teddies/order`, requestOptions)
  .then((response) => response.json())
  .then((json) => {
    console.log(json)
    localStorage.removeItem('shoppingCart')
    window.location.href = `${window.location.origin}/orderStatus.html?orderId=${json.orderId}`
  })
  .catch(() => {
    alert(error)
  })
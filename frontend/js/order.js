const getDataOrder = JSON.parse(localStorage.getItem('order'));

function localVariable() {
    //Recuperer la valeur de prixTotal dans le localStorage et la Parser
    //prixTotalJSON = localStorage.getItem("prixTotal");
    let prixTotal =  JSON.parse(localStorage.getItem("prixTotal"));

    //Selectionné la div corespondante 
    let prixLocalDiv = document.querySelector(".prixlocal");

    // Afficher la valeur de prixTotal du localStorage
    prixLocalDiv.textContent =`${prixTotal} €`;
} 

localVariable();

function orderIdAndReturn() {
    // Selectionnez la div qui affichera l'OrderId
    let orderId = document.querySelector(".orderid");

    // Afficher l'OrderId dans la confirmation
    orderId.textContent = getDataOrder.orderId;

     //Supprimer le Panier
     localStorage.removeItem('basket');

}

orderIdAndReturn();
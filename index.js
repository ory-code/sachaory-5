main ()

async function main() {
    const articles = await getArticles()
    console.log(articles);
    displayArticles(articles)
}

function getArticles() {
   return fetch ("http://localhost:3000/api/teddies")
    .then(function(httpBodyResponse){
      return httpBodyResponse.json()
    })
    .then(function(articles){
        console.log(articles);
    })
    .catch(function(error){
        alert(error)
    })
} 

function displayArticles() {
    return ""
}
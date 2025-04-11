const main = document.getElementsByTagName("main").item(0);
const cardsContainer = document.getElementById("cards-container");
const URLMain = "https://fakestoreapi.com/products/";

function getData() {
    const options = {"method": "GET"};
    fetch(URLMain, options)
        .then((response) => {
            console.log(response);
            response.json()
                .then((res) => {
                    console.log(res.length)
                    console.log(res)
                    console.log(res[0].description)
                    console.log(res[0].id)
                    console.log(res[0].price)
                    console.log(res[0].rating)
                    console.log(res[0].rating.count)
                    console.log(res[0].category)
                    createCards(res);
                })
                .catch()
        })
        .catch((err) => {
            main.insertAdjacentHTML(
                "beforeend",
                `<div class="alert alert-danger" role="alert">
                                            ${err.message}
                                            </div>`)
        });
}//Getdata

getData();

function createCards(prods) {
    prods.forEach(e => {
        let descripcion = e.description.slice(0,80) + " ...";
        console.log("este es el arreglo", e);
        cardsContainer.insertAdjacentHTML("beforeend",
            `
                                <div class="card d-grid" style="width: 18rem;">
                                <img src="${e.image}" class="card-img-top" alt="${e.title}">
                                <div class="card-body">
                                <h5 class="card-title">${e.title}</h5>
                                <h6 class="card-title">${e.category}</h6>
                                <p class="card-text">${descripcion}</p>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${e.id}">
                                            Mas informacion
                                            </button>
                                            <!-- Modal -->
                                <div class="modal fade" id="exampleModal${e.id}" tabindex="-1" aria-labelledby="exampleModalLabel${e.id}" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModal${e.id}">${e.title}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                    <h6 class="card-title fw-bold">${e.category}</h6>
                                        <p class="card-text">${e.description}</p>
                                <p class="card-text fw-bold">$${e.price}</p>
                                <p class="card-text fs-5">Rating</p>
                                <p class="card-text ">Valoracion:${e.rating.rate} Votos:${e.rating.count}</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                </div>
                                </div>`
        );
    });
}//CreateCards
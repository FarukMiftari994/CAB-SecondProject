fetch("https://api.quotable.io/quotes/random?limit=3")
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    for (let i = 0; i < result.length; i++) {
      document.getElementById("tags" + i).innerHTML = result[i].tags;
      //   const quote = document.getElementById("quote" + i);
      //   quote.innerHTML = response[i].content;
      //   console.log(quote);
      document.getElementById("quote" + i).innerHTML = result[i].content;
      document.getElementById("author" + i).innerHTML =
        result[i].author.toUpperCase();
      document.getElementById("date" + i).innerHTML = result[i].dateAdded;
    }
  })
  .catch((error) => {
    console.log(error);
  });

///////////

function fetchData() {
  fetch("https://api.quotable.io/quotes?page=7&limit=3")
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      allData(result.results);
    });
}
fetchData();

{
  /* <div class="container min-vh-100 d-flex justify-content-md-center align-items-center">
      <div class="row">
        <div class="col col-lg-4">
          <div class="card(holder) text-center align-items-center">
            <div class="card-header fs-5" id="tags0"></div>
            <div class="card-body">
              <p class="card-text" id="quote0"></p>
              <h5 class="card-title" id="author0"></h5>
            </div>
            <a href="#" class="btn btn-outline-secondary">Add to Favourites</a>
            <div class="card-footer text-muted" id="date0"></div>
          </div>
        </div> */
}

function allData(result) {
  const cards = document.getElementById("cards");
  for (let i = 0; i < result.length; i++) {
    const cardRow = document.createElement("div");
    cardRow.classList.add("row");
    cards.appendChild(cardRow);
    const cardColumn = document.createElement("div");
    cardColumn.classList.add("col");
    cardColumn.classList.add("col-lg-4");
    cardRow.appendChild(cardColumn);
    const cardHolder = document.createElement("div");
    cardHolder.classList.add("card");
    cardHolder.classList.add("text-center");
    cardHolder.classList.add("align-items-center");
    cardColumn.append(cardHolder);
    const tag = document.createElement("div");
    tag.classList.add("card-header");
    tag.classList.add("fs-5");
    tag.innerHTML = result[i].tags;
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const quote = document.createElement("p");
    quote.classList.add("card-text");
    quote.innerHTML = result[i].content;
    const author = document.createElement("h5");
    author.classList.add("card-title");
    author.innerHTML = result[i].author;
    cardBody.append(quote, author);
    const date = document.createElement("div");
    date.classList.add("card-footer");
    date.classList.add("text-muted");
    date.innerHTML = result[i].dateAdded;
    cardHolder.append(tag, cardBody, date);
  }
}

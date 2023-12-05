function randomFetch() {
  fetch("https://api.quotable.io/quotes/random?limit=3")
    .then((response) => response.json())
    .then((result) => {
      console.log("randomFetch");
      console.log(result);
      allData(result);
      // for (let i = 0; i < result.length; i++) {
      //   document.getElementById("tags" + i).innerHTML = result[i].tags;
      //   //   const quote = document.getElementById("quote" + i);
      //   //   quote.innerHTML = result[i].content;
      //   //   console.log(quote);
      //   document.getElementById("quote" + i).innerHTML = result[i].content;
      //   document.getElementById("author" + i).innerHTML =
      //     result[i].author.toUpperCase();
      //   document.getElementById("date" + i).innerHTML = result[i].dateAdded;
      // }
    })
    .catch((error) => {
      console.log(error);
    });
}
randomFetch();

///////////

function fetchData() {
  fetch("https://api.quotable.io/quotes?page=7&limit=150")
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      allData(result.results);
      fillTheAuthors(result.results);
      addListeners(result.results);
      // builddataoptions(result.results)
      // fillTheQuotes(result.results);
    });
}
fetchData();

function fetchData2() {
  fetch("https://api.quotable.io/tags")
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      fillTheTags(result);
    });
}
fetchData2();

function allData(result) {
  const cards = document.getElementById("cards");
  cards.innerHTML = "";
  const cardRow = document.createElement("div");
  cardRow.classList.add("row");
  cards.appendChild(cardRow);
  for (let i = 0; i < result.length; i++) {
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

function fillTheTags(result) {
  const allTags = document.getElementById("tags");
  const allStrings = result.map((tags) => tags.name);
  const uniqueValues = new Set(allStrings);
  console.log(uniqueValues);
  uniqueValues.forEach((tags) => {
    const option = document.createElement("option");
    option.value = tags;
    option.innerHTML = tags;
    allTags.appendChild(option);
  });
}

function addEvent() {
  const quotes = document.getElementById("h-quotes");
  quotes.addEventListener("click", (event) => {
    // const input = document.querySelector("input");
    // allData();
    // const second = document.querySelector("cards");
    // cards.innerHTML = "";
    randomFetch();
  });

  const all = document.getElementById("allTags");
  all.addEventListener("click", (event) => {
    fetchData();
  });
}
addEvent();

function addListeners(tagsArray) {
  console.log(tagsArray);
  const selectTag = document.getElementById("tags");
  selectTag.addEventListener("change", (event) => {
    console.log(selectTag.value);

    if (event.target.value === "all") {
      allData(tagsArray);
    } else {
      const filteredArray = tagsArray.filter((t) => {
        return t.tags.includes(selectTag.value);
      });
      console.log(event.target.value);
      allData(filteredArray);
    }
  });

  const searchBar = document.querySelector("form");
  searchBar.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("input");
    // if (input.value === "") {
    //   allData(tagsArray);
    // } else {
    const filteredArray = tagsArray.filter((a) => {
      return a.author === input.value;
    });
    allData(filteredArray);
    console.log(filteredArray);
    // }
    // allData(input.value);
    console.log(input.value);
  });
}
// function hideElement(id) {
//   const element = document.getElementById(id);
//   element.classList.add("hide");
// }

// function showElement(id) {
//   const element = document.getElementById(id);
//   element.classList.remove("hide");
// }

function fillTheAuthors(result) {
  const arr = document.getElementById("input");
  arr.setAttribute("list", "myList");
  const dl = document.createElement("DATALIST");
  dl.setAttribute("id", "myList");
  // for (let i = 0; i < result.length; i++) {
  const theValues = result.map((quotes) => quotes.author);
  const uniqueValues = new Set(theValues);
  uniqueValues.forEach((quotes) => {
    const option = document.createElement("OPTION");
    option.value = quotes;
    dl.appendChild(option);
  });
  arr.appendChild(dl);
  // }
}

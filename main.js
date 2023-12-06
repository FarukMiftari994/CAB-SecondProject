function randomFetch() {
  fetch("https://api.quotable.io/quotes/random?limit=3")
    .then((response) => response.json())
    .then((result) => {
      console.log("randomFetch");
      console.log("this is it :", result);
      console.log(result.statusMessage);
      if (!result.statusMessage) {
        allData(result);
      } else {
        WentWrong();
      }
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
      WentWrong();
    });
} //deploying
randomFetch();

///////////

function fetchData() {
  fetch("https://api.quotable.io/quotes?page=7&limit=150")
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (!result.statusMessage) {
        allData(result.results);
        fillTheAuthors(result.results);
        addListeners(result.results);
      } else {
        WentWrong();
      }

      // builddataoptions(result.results)
      // fillTheQuotes(result.results);
    })
    .catch((error) => {
      console.log(error);
      WentWrong();
    });
}
fetchData();

function fetchData2() {
  fetch("https://api.quotable.io/tags")
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (!result.statusMessage) {
        fillTheTags(result);
      } else {
        alert("Something went wrong with the tags");
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Something went wrong with the tags");
    });
}
fetchData2();

function allData(result) {
  const cards = document.getElementById("cards");
  cards.innerHTML = "";
  const cardRow = document.createElement("div");
  cardRow.classList.add("row");
  cardRow.classList.add("justify-content-around");
  cards.appendChild(cardRow);
  for (let i = 0; i < result.length; i++) {
    const cardColumn = document.createElement("div");
    cardColumn.classList.add("col");
    cardColumn.classList.add("col-lg-4");
    cardColumn.style = "min-width: 380px;";
    cardRow.appendChild(cardColumn);
    const cardHolder = document.createElement("div");
    cardHolder.classList.add("card");
    cardHolder.classList.add("text-center");
    cardHolder.classList.add("align-items-center");
    cardColumn.append(cardHolder);
    const tag = document.createElement("div");
    tag.classList.add("card-header");
    tag.classList.add("fs-5");
    if (result[i].tags == "") {
      tag.innerHTML = "No Tag Found";
    } else {
      tag.innerHTML = result[i].tags;
    }
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

function noData() {
  const cards = document.getElementById("cards");
  cards.innerHTML = "";
  const cardRow = document.createElement("div");
  cardRow.classList.add("row");
  cardRow.classList.add("justify-content-around");
  cards.appendChild(cardRow);
  const cardColumn = document.createElement("div");
  cardColumn.classList.add("col");
  cardColumn.classList.add("col-lg-4");
  cardColumn.style = "min-width: 380px;";
  cardRow.appendChild(cardColumn);
  const cardHolder = document.createElement("div");
  cardHolder.classList.add("card");
  cardHolder.classList.add("text-center");
  cardHolder.classList.add("align-items-center");
  cardColumn.append(cardHolder);
  const tag = document.createElement("div");
  tag.classList.add("card-header");
  tag.classList.add("fs-5");
  tag.innerHTML = "OOPS!";
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const quote = document.createElement("p");
  quote.classList.add("card-text");
  quote.innerHTML = "";
  const author = document.createElement("h5");
  author.classList.add("card-title");
  author.innerHTML = "There's no Quote with the 'Selected Filters'";
  cardBody.append(quote, author);
  const date = document.createElement("div");
  date.classList.add("card-footer");
  date.classList.add("text-muted");
  date.innerHTML = "Error 404";
  cardHolder.append(tag, cardBody, date);
}

function WentWrong() {
  const cards = document.getElementById("cards");
  cards.innerHTML = "";
  const cardRow = document.createElement("div");
  cardRow.classList.add("row");
  cardRow.classList.add("justify-content-around");
  cards.appendChild(cardRow);
  const cardColumn = document.createElement("div");
  cardColumn.classList.add("col");
  cardColumn.classList.add("col-lg-4");
  cardColumn.style = "min-width: 380px;";
  cardRow.appendChild(cardColumn);
  const cardHolder = document.createElement("div");
  cardHolder.classList.add("card");
  cardHolder.classList.add("text-center");
  cardHolder.classList.add("align-items-center");
  cardColumn.append(cardHolder);
  const tag = document.createElement("div");
  tag.classList.add("card-header");
  tag.classList.add("fs-5");
  tag.innerHTML = "WHAAAAT?";
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const quote = document.createElement("p");
  quote.classList.add("card-text");
  quote.innerHTML = "";
  const author = document.createElement("h5");
  author.classList.add("card-title");
  author.innerHTML = "It seems like something went wrong";
  cardBody.append(quote, author);
  const date = document.createElement("div");
  date.classList.add("card-footer");
  date.classList.add("text-muted");
  date.innerHTML = "Error 404";
  cardHolder.append(tag, cardBody, date);
}

function fillTheTags(result) {
  const allTags = document.getElementById("tags");
  const allStrings = result.map((tags) => tags.name);
  allStrings.forEach((tags) => {
    const option = document.createElement("option");
    option.value = tags;
    option.innerHTML = tags;
    allTags.appendChild(option);
  });
}

function fillTheAuthors(result) {
  const arr = document.getElementById("input");
  arr.setAttribute("list", "myList");
  const dl = document.createElement("DATALIST");
  dl.setAttribute("id", "myList");
  const theValues = result.map((quotes) => quotes.author);
  const uniqueValues = new Set(theValues);
  uniqueValues.forEach((quotes) => {
    const option = document.createElement("OPTION");
    option.value = quotes;
    dl.appendChild(option);
  });
  arr.appendChild(dl);
}

function addEvent() {
  const quotes = document.getElementById("h-quotes");
  quotes.addEventListener("click", (event) => {
    randomFetch();
  });

  const all = document.getElementById("allTags");
  all.addEventListener("click", (event) => {
    fetchData();
  });
}
addEvent();

function addListeners(tagsArray) {
  const searchBar = document.querySelector("form");
  const input = document.getElementById("input");

  const selectTag = document.getElementById("tags");

  selectTag.addEventListener("change", (event) => {
    const result = filteredArrayByTag(selectTag.value, tagsArray);
    console.log(result);
    if (input.value !== "") {
      const result2 = filteredArrayByAuthor(input.value, result);
      checkForTag(result2);
    } else {
      checkForTag(result);
    }
  });

  searchBar.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = filteredArrayByAuthor(input.value.toLowerCase(), tagsArray);
    console.log(result);
    if (selectTag.value !== "") {
      const result2 = filteredArrayByTag(selectTag.value, result);
      checkForTag(result2);
    } else {
      checkForTag(result);
    }
    // allData(input.value);
  });

  const button = document.getElementById("clear");
  button.addEventListener("click", () => {
    input.value = "";
    selectTag.value = "all";
    allData(tagsArray);
  });
}

function filteredArrayByTag(SelectedTag, tagsArray) {
  if (SelectedTag === "all") {
    return tagsArray;
  } else {
    const filteredArray = tagsArray.filter((t) => {
      return t.tags.includes(SelectedTag);
    });
    return filteredArray;
    console.log(filteredArray);
  }
}

function filteredArrayByAuthor(SelectedAuthor, tagsArray) {
  if (SelectedAuthor === "") {
    return tagsArray;
  } else {
    const filteredArray = tagsArray.filter((a) => {
      return a.author.toLowerCase().includes(SelectedAuthor);
    });
    return filteredArray;
    console.log(filteredArray);
  }
}

function checkForTag(result) {
  if (result.length === 0) {
    noData();
  } else {
    allData(result);
  }
}

function hideElement(id) {
  const element = document.getElementById(id);
  element.classList.add("hide");
}

function showElement(id) {
  const element = document.getElementById(id);
  element.classList.remove("hide");
}

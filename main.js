fetch("https://api.quotable.io/quotes/random?limit=3")
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      document.getElementById("tags" + i).innerHTML = response[i].tags;
      //   const quote = document.getElementById("quote" + i);
      //   quote.innerHTML = response[i].content;
      //   console.log(quote);
      document.getElementById("quote" + i).innerHTML = response[i].content;
      document.getElementById("author" + i).innerHTML =
        response[i].author.toUpperCase();
      document.getElementById("date" + i).innerHTML = response[i].dateAdded;
    }
  })
  .catch((err) => {
    console.log(err);
  });

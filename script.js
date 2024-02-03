var tableBody = document.getElementById("news-table");
var fetchButton = document.getElementById("fetch-button");

function getApi() {
  tableBody.innerHTML = "";
  var input = document.getElementById("start");
  var date = input.value;
  var requestUrl =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=pQodcmInL5JLGLqj8JrP6mVzGiqtek2K&fq=pub_date:(" +
    date +
    ")";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.response.docs.length; i++) {
        var createTableRow = document.createElement("tr");
        var tableData = document.createElement("td");
        var link = document.createElement("a");
        link.textContent = data.response.docs[i].headline.main;
        link.href = data.response.docs[i].web_url;
        link.target = "_blank";
        tableData.appendChild(link);
        var slicedData = data.response.docs[i].headline.main.substring(0, 30);
        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
        getGiphyAPI(slicedData, createTableRow);

        var favorite = document.createElement("button");
        favorite.setAttribute("data-link", data.response.docs[i].web_url);
        favorite.textContent = "Add To Favorites";
        
        favorite.onclick = addFavorite;
        var br = document.createElement("br");
        tableData.append(br, favorite);
      }
    });
}

fetchButton.addEventListener("click", getApi);

function getGiphyAPI(abstract, createTableRow) {
  var url = `https://api.giphy.com/v1/gifs/search?api_key=Mvh8fJI89ojteXjhMds1xNInhE9z4zCT&q=${abstract}&limit=1&offset=0&rating=g&lang=en`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var image = document.createElement("img");
      image.src = data.data[0].images.fixed_height.url;
      image.style.maxWidth = "200px";
      image.style.maxHeight = "200px";
      createTableRow.appendChild(image);
    });
}

function addFavorite() {
  var favorites = JSON.parse(localStorage.getItem("favorited")) || [];

  var obj = {
    title: this.dataset.link,
  };

  favorites.push(obj);
  localStorage.setItem("favorited", JSON.stringify(favorites));
  this.disabled = true;
  
  var favoritesDiv = document.getElementById('favorites-table');
  var linkElement = document.createElement('a');
  var newRow = favoritesDiv.insertRow();
  var newCell = newRow.insertCell();

  newCell.textContent = obj.link;
  linkElement.href = obj.link;
  linkElement.textContent = obj.title;
  favoritesDiv.appendChild(linkElement);
};
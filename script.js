

//API Call - NY Times
var tableBody = document.getElementById('repo-table');
var fetchButton = document.getElementById('fetch-button');
function getApi() {
  tableBody.innerHTML = '';
  var input = document.getElementById('start');
  var date = input.value;
  var requestUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=pQodcmInL5JLGLqj8JrP6mVzGiqtek2K&fq=pub_date:(' + date + ')';
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    
    .then(function (data) {
      console.log(data)

      for (var i = 0; i < data.response.docs.length; i++) {
        var createTableRow = document.createElement('tr');
        var tableData = document.createElement('td');
        var link = document.createElement('a');
        link.textContent = data.response.docs[i].headline.main;
        link.href = data.response.docs[i].web_url;
        tableData.appendChild(link);
        var keyWord = data.response.docs[i].keywords[0].value;
        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
        //console.log(data);
        getGiphyAPI(keyWord,createTableRow);
        console.log(keyWord);
      }
    });
}
fetchButton.addEventListener('click', getApi);


function getGiphyAPI(abstract, createTableRow) {
  //var {
  //   headline  
  //} = abstract
//console.log(headline);
  var url = `https://api.giphy.com/v1/gifs/search?api_key=Mvh8fJI89ojteXjhMds1xNInhE9z4zCT&q=${abstract}&limit=1&offset=0&rating=g&lang=en`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
     // var reducedAbstract = data.data[0].title.substring(0, 20);
      //console.log(reducedAbstract);
      var image = document.createElement("img");
      image.src = data.data[0].images.fixed_height.url;
      image.style.maxWidth = "200px";
      image.style.maxHeight = "200px";
      createTableRow.appendChild(image);
    })
  }


// data.response.docs[i].abstract ?









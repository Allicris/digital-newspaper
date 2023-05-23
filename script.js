

//API Call - NY Times
var tableBody = document.getElementById('repo-table');
var fetchButton = document.getElementById('fetch-button');
function getApi() {
  var requestUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=pQodcmInL5JLGLqj8JrP6mVzGiqtek2K';
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
        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
      }
    });
}
fetchButton.addEventListener('click', getApi);



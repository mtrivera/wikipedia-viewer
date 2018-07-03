function getUserInput() {
  $('button.search').on('click', function() {
    getQuery($('input').val());
  });
}

function getQuery(searchQuery) {
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    headers: { 'Api-User-Agent': 'Wiki_Viewer/1.0' },
    data: {
      action: 'opensearch',
      format: 'json',
      origin: '*',
      search: searchQuery
    },
    type: 'GET',
    dataType: 'json',
    success: function(data) {
       displayResults(data);
    }             
  });
}

function displayResults(listData) {
  const MAX_RESULTS = 10;
  let html = '';
  
  html += '<h2 class="text-center">Results</h2>';

  for (let count = 0; count < MAX_RESULTS; count += 1) { 
    html += '<li class="result p-4 mb-4">';
    html += '<a href=' + listData[3][count] + ' ' + 'target="_blank">';
    html += '<h3>' + listData[1][count] + '</h3>';
    html += '<p>' + listData[2][count] + '</p>';
    html += '</a>';
    html += '</li>';
  }

  $('ul.results').html(html);
}

$(document).ready(function() {
  getUserInput();
});
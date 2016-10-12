let wikiSearch = (function() {
  // Event handlers
  $("#random").on("click", function() {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
    clearSearch();
  });
  $("#search").on("click", getSearch);

  function callWikiAPI(query) {
    $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&exintro&generator=search&gsrsearch=" + query + "&callback=?", showResults);
  }

  function clearSearch() {
    $("#searchbar").val("");
  }

  function getSearch(e) {
    var searchFor = $("#searchbar").val();
    e.preventDefault();
    searchFor ? callWikiAPI(searchFor) : returnInvalidInput(searchFor);
  }

  function returnInvalidInput() {
    console.log('invalid input!');
  }

  function showResults(data) {
    console.log(data);
    $("#results-list").empty();
    if (data && data.query && data.query.pages) {
      pages = data.query.pages;
    }
    for (var id in pages) {
      if (pages[id].title && pages[id].extract) {
        $("#results-list").append("<li><ul class='search-result-item'><li><a href='http://en.wikipedia.org/?curid=" + pages[id].pageid + "' target='_blank'>" + pages[id].title + "</a></li><li class='extract'>" + pages[id].extract) + "</li></ul>";
      }
    }
    clearSearch();
  }

  return {
    random: random,
    search: search
  };
})();

$(document).ready(function() {
  wikiSearch;
});

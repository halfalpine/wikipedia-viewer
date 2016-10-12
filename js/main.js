let wikiSearch = (function() {
  // Event handlers
  $("#random").on("click", function() {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
    clearSearch();
  });
  $("#search").on("click", getSearch);

  function clearSearch() {
    $("#searchbar").val("");
  }

  function getSearch(e) {
    e.preventDefault();
    var searchFor = $("#searchbar").val();
    $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&exintro&generator=search&gsrsearch=" + searchFor + "&callback=?", showResults);
  }

  function showResults(data) {
    console.log(data);
    $("#results-list").empty();
    if (data && data.query && data.query.pages) {
      pages = data.query.pages;
    } else {
      $("#results").html("Search error 1!");
    }
    for (var id in pages) {
      if (pages[id].title && pages[id].extract) {
        $("#results-list").append("<li><ul class='search-result-item'><li><a href='http://en.wikipedia.org/?curid=" + pages[id].pageid + "' target='_blank'>" + pages[id].title + "</a></li><li class='extract'>" + pages[id].extract) + "</li></ul>";
      }
      else {
        $("#results").html("Search error 2!");
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

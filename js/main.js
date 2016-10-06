$(document).ready(function() {

  // Event handlers
  $("#random").on("click", function() {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });
  $("#random").on("click", clearSearch);

  $("#search").on("click", getSearch);
  $("#search").on("click", clearSearch);

  function clearSearch() {
    $("#searchbar").val("");
  }

  function getSearch() {
    var searchFor = $("#searchbar").val();
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exlimit=max&exintro&generator=search&gsrsearch=" + searchFor + "&callback=?", showResults);
  }

  function showResults(raw_json) {
    var pages;
    $("#results-list").empty();
    if (raw_json && raw_json.query && raw_json.query.pages) {
      pages = raw_json.query.pages;
    } else {
      $("#results").html("Search error!");
    }
    for (var id in pages) {
      if (pages[id].title && pages[id].extract) {
        $("#results-list").append("<li><ul class='search-result-item'><li><a href='http://en.wikipedia.org/?curid=" + pages[id].pageid + "' target='_blank'>" + pages[id].title + "</a></li><li class='extract'>" + pages[id].extract) + "</li></ul>";
      }
      else {
        $("#results").html("Search error!");
      }
    }
  }

});

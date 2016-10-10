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
    $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&limit=10&namespace=0&search=" + searchFor + "&callback=?"/*, showResults*/);
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
      console.log(id);
      if (pages[id].title && pages[id].extract) {
        $("#results-list").append("<li><p class='search-result-item'><p><a href='http://en.wikipedia.org/?curid=" + pages[id].pageid + "' target='_blank'>" + pages[id].title + "</a></p><p class='extract'>" + pages[id].extract) + "</p></p></li>";
      }
      else {
        $("#results").html("Search error!");
      }
    }
  }

});

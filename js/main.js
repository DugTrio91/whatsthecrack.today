$(document).ready(function () {

    //active news index
    var n = 0;

    //background image options
    var backgrounds = [
		"images/pride.jpg",
		"images/cycling.jpg",
		"images/mothers.jpg",
	];

    function changeNews() {
        n++
        if (n > (backgrounds.length - 1)) n = 0;
        newsHeadlines(n);
    }

    //cycle through news every 5 seconds
    var interval = setInterval(changeNews, 5000);

    //toggle active news when link is clicked
    $(".headline").click(function (e) {
        e.preventDefault();

        //get index of clicked headline
        n = $(".headline").index(this);
        newsHeadlines(n);
    });
    $(".counter").click(function (e) {
        e.preventDefault();

        n = $(".counter").index(this);
        newsHeadlines(n);
    });

    function newsHeadlines(n) {
        clearInterval(interval);

        //remove active classes
        $(".headline-active").removeClass("headline-active");
        $(".counter-active").removeClass("counter-active");

        //add active clsses
        $(".headline:nth-child(" + parseInt(n + 1) + ")").addClass("headline-active");
        $(".counter:nth-child(" + parseInt(n + 1) + ")").addClass("counter-active");

        //change background image
        $(".jumbotron").css("background-image", "url(" + backgrounds[n] + ")");

        interval = setInterval(changeNews, 5000);
    }

    //expanding menu for buttons in card A
    $(".button-section").click(function () {
        $(this).find(".button-content").slideToggle();
    });
    
    //Background colours
    $('.default').click(function () {
        $('body').css("background", "#2e2e30");
    });
    
    $('.peach-echo').click(function () {
        $('body').css("background", "#f27271");
    });
    
    $('.fiesta').click(function () {
        $('body').css("background", "#e93c45");
    });
    
    $('.green-flash').click(function () {
        $('body').css("background", "#6bc06f");
    });
    
    $('.limpet-shell').click(function () {
        $('body').css("background", "#93d5d5");
    });
    
    $('.snorkel-blue').click(function () {
        $('body').css("background", "#075385");
    });
    
    $('.buttercup').click(function () {
        $('body').css("background", "#f5e472");
    });

    //store movie information
    var movies = [];

    //imdb ids for movies
    var keys = ["tt0803096", "tt3040964", "tt3949660", "tt2567026", "tt2709768"];

    //convert given rating to star rating
    function ratingToStars(rating) {
        //validate input
        if (rating === "N/A") rating = 0;

        //convert rating to out of 5 instead of 10
        rating = rating / 2;

        var starRating = "";
        var stars = 0;

        //output stars
        for (var i = 1; i <= rating; i++) {
            starRating += "<i class='fa fa-star' aria-hidden='true'></i>";
            stars++;
        }

        //add half a star is there is more than 0.5 left over
        if (rating - stars > 0.5) {
            starRating += "<i class='fa fa-star-half' aria-hidden='true'></i>";
        }

        return starRating;
    }

    //get movie information using omdb api
    function fetchData(key) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "http://www.omdbapi.com/?i=" + key + "&plot=short&r=json",
            success: function (data) {
                //push needed data to movies array
                movies.push({
                    movieTitle: data.Title,
                    moviePoster: data.Poster,
                    movieRating: data.imdbRating
                });

                //when the movies array is fully populated
                if (movies.length === keys.length) {
                    for (var i = 0; i < movies.length; i++) {
                        //display info for each movie
                        outputMovie(movies[i]);
                    }
                }
            },
            error: function (data) {
                alert("An error has occured");
            }
        });
    }

    function outputMovie(data) {
        //api call failed
        if (!data) {
            //do it again
            fetchData(keys[movies.length]);
            return false;
        } else {

            //prepare movie details for output
            var movieTitle = "<span>" + data.movieTitle + "</span>";
            var moviePoster = "<div class='movie-poster' style='background: url(" + data.moviePoster + ");'></div>"
            var movieRating = "<p class='movie-rating'>" + ratingToStars(data.movieRating) + "</p>";

            //prepare final element and append to page
            var movie = "<div class='movie'>";
            movie += moviePoster;
            movie += "<div class='movie-info'>";
            movie += movieTitle;
            movie += movieRating;
            movie += "</div></div>";
            $(".movie-list").append(movie);

        }
    }

    //populate movies array
    for (var i = 0; i < keys.length; i++) {
        fetchData(keys[i]);
    }

});
var cars = ["Nissan", "Mitsubishi", "Toyota", "Subaru", "Ferrari", "Lamborghini", "Mclaren", "Koenigsegg"];

function displayData() {
    var car = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        car + "&api_key=dc6zaTOxFJmzC&limit=10";

    //call api
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        $("#carImagesHere").empty();
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var carDiv = $('<div>');
            var carText = $('<p>').text("Rating : " + results[i].rating);
            var carImg = $('<img>');
            carImg.addClass("imgStart well");
            carImg.attr('data-still', results[i].images.fixed_height_still.url);
            carImg.attr('src', results[i].images.fixed_height_still.url);
            carImg.attr('data-animate', results[i].images.fixed_height.url);
            carImg.attr("data-state", "still");
            carDiv.prepend(carText);
            carDiv.append(carImg);
            $('#carImagesHere').prepend(carDiv);
        }
        $('.imgStart').on("click", function() {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr('src', $(this).data("animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr('src', $(this).data("still"));
                $(this).attr("data-state", "still");
            }
        });

    });


}

$(document).on("click", ".carType", displayData);


//create the button for items in the array
function createButton() {
    $("#carButtons").empty();
    for (var i = 0; i < cars.length; i++) {
        var carBut = $("<button>");
        carBut.addClass("carType");
        carBut.attr("data-name", cars[i]);
        carBut.text(cars[i]);
        $("#carButtons").append(carBut);
    }
}
//adds user input to the array and then adds the button
$("#addCar").on("click", function(event) {
    event.preventDefault();
    var carAdd = $("#userInput").val().trim();
    cars.push(carAdd);
    createButton();

});
$("#addCar").empty();



createButton();

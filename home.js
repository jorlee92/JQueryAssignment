$(document).ready(function () {
    let showDVDCreateScreen = false;
    $("#submitDVDNew").click((e) => {
        e.preventDefault();
        var title = $("#a").val();
        var releaseDate = $("#b").val();
        var director = $("#c").val();
        var rating = $("#d").val();
        var note = $("#e").val();

        console.log(JSON.stringify({
            title: title, releaseDate: releaseDate, director: director, rating: rating, note: note
        }));

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            type: "POST",
            url: "http://dvd-library.us-east-1.elasticbeanstalk.com/dvd",
            data: JSON.stringify({
                title: title, releaseDate: releaseDate, director: director, rating: rating, note: note
            }),
            success: function(){
                console.log("New DVD Created")
            },
            dataType: "json"
          });


    })

    $.get("http://dvd-library.us-east-1.elasticbeanstalk.com/dvds", (d) => {
        console.log(d);
        d.forEach(element => {
            createTableRow(element);
        });
    })
    $("#createDVDBox").hide();

    $("#createDVD").click(() => {
        showDVDCreateScreen = !showDVDCreateScreen;
        if(!showDVDCreateScreen){
            $("#createDVDBox").hide();
        }
        else {
            $("#createDVDBox").show();
        }
    })

})

let createTableRow = (data) => {
    $("#tableRows").append(`<tr>
    <th scope="row">${data.releaseYear}</th>
    <td>${data.title}</td>
    <td>${data.director}</td>
    <td>${data.rating}</td>
    <td><span >Delete</span><span>Other option</span><td>
  </tr>`)
}
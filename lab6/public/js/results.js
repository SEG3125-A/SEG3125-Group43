$(document).ready(function() {
    var res = $.get("/result/example.json", function(data) {
        console.log(data);
    });
});

import $ from "jquery";

window.onbeforeunload = function () {
    $('.Loader').show();
}

document.onreadystatechange = function () {
    if (document.readyState == "complete")
        $('.Loader').hide();
}

// on change url
window.addEventListener("popstate", function () {
    if (location.href.indexOf("#") == 0) {
        $('.Loader').show();
    }
});

// $('[href]').click(function() {
//     console.log('href')
//     $('.Loader').show();
// });

$("#logout").click(function() {
    $.removeCookie("address");
    $.removeCookie("latestPage");
    window.location.replace("/");
});

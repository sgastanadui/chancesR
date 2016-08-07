﻿function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function showModal() {
    $("body").append('<div class="modalWindow"/>');
    $.mobile.showPageLoadingMsg();
    setTimeout('hideModal()', 2000);
}

function hideModal() {
    $(".modalWindow").remove();
    $.mobile.hidePageLoadingMsg();

}

function cleanDate(d) {
    return new Date(+d.replace(/\/Date\((\d+)\)\//, '$1'));
}
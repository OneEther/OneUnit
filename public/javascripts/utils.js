
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var shorten = function(str) {
    return str.substring(0, 6) + ".." + str.substring(str.length - 4);
}

var getUnitLink = function(msg, value, currency) {
    return "<a href='/unit?value=" + value + "&currency=" + currency + "'>" + msg + "</a>";
}

var weiToString = function (wei) {
    if (wei === 0) {
        return "0 Ether";
    }
    if (wei < 1000000000) {
        return getUnitLink(wei + " Wei", wei, "Wei");
    }
    else if (wei < 1000000000000) {
        var value = (wei/1000000000).toFixed(3);
        return getUnitLink(value + " Shannon", value, "Shannon");
    }
    else if (wei < 1000000000000000) {
        var value = (wei/1000000000000).toFixed(3);
        return getUnitLink(value + " Szabo", value, "Szabo");
    }
    else if (wei < 1000000000000000000) {
        var value = (wei/1000000000000000).toFixed(3);
        return getUnitLink(value + " Finney", value, "Finney");
    }
    else {
        var value = (wei/1000000000000000000).toFixed(3);
        return getUnitLink(value + " Ether", value, "Ether");
    }
}

var prettyPrintHash = function(hr) {
    if (hr < 1000) {
        return hr + " H";
    }
    else if (hr < 1000000) {
        return (hr/1000) + " KH";
    }
    else if (hr < 1000000000) {
        return (hr/1000000) + " MH";
    }
    else if (hr < 1000000000000){
        return (hr/1000000000) + " GH";
    } else {
        return (hr/1000000000000) + " TH";
    }
}

var prettyPrintHashrate = function(hr) {
    if (hr < 1000) {
        return hr + " H/s";
    }
    else if (hr < 1000000) {
        return (hr/1000).toFixed(3) + " KH/s";
    }
    else if (hr < 1000000000) {
        return (hr/1000000).toFixed(3) + " MH/s";
    }
    else {
        return (hr/1000000000).toFixed(3) + " GH/s";
    }
}

var strip = function(number) {
    return (parseFloat(number.toPrecision(12)));
}

var shorten = function(str) {
    return str.substring(0, 6) + ".." + str.substring(str.length - 4);
}

var getBlockLink = function(block) {
    var blockLink = "<a href='/chain/" + parseInt(block) + "'>Block " + parseInt(block) + "</a>";
    return blockLink;
}

var getAddressLink = function(address) {
    if (!address) return "Guest";
    if (address == "Guest") return "Guest";
    var addressLink = "<a href='/chain/" + address + "'>" + shorten(address) + "</a>";
    return addressLink;
}

var getFullAddressLink = function(address) {
    if (!address) return "Guest";
    if (address == "Guest") return "Guest";
    var addressLink = "<a href='/chain/" + address + "'>" + address + "</a>";
    return addressLink;
}

var getEstimateLink = function(hashrate) {
    var link = "<a href='/estimate?hashrate=" + (hashrate/1000000) + "'>" + prettyPrintHashrate(hashrate) + "</a>";
    return link;
}

var getTxhashLink = function(txhash) {
    var link = "<a href='/chain/" + txhash + "'>" + shorten(txhash) + "</a>";
    return link;
}


var prettyPrintMills = function(mills) {
    if (mills < 60000) {
        return parseInt(mills/1000) + " seconds ago";
    }
    else if (mills < 60000 * 60) {
        return parseInt(mills/60000) + " minutes ago";
    }
    else if (mills < 60000 * 60 * 24) {
        return parseInt(mills/60000/60) + " hours ago";
    }
    else {
        return parseInt(mills/60000/60/24) + " days ago";
    }
}

var getAgo = function(str) {
    origTime = (new Date(str)).getTime();
    curTime = (new Date()).getTime();
    return prettyPrintMills(curTime - origTime);
}

function timeConverter(UNIX_timestamp){
      var a = new Date(UNIX_timestamp);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var year = a.getFullYear();
            var month = months[a.getMonth()];
              var date = a.getDate();
                var hour = a.getHours();
                  var min = a.getMinutes();
                    var sec = a.getSeconds();
                      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
                        return time;
}

var createDiv = function(block, from, to, amt, hash, mills, isSent) {
    var blockLink = "<a href='/chain/" + parseInt(block) + "'> " + prettyPrintMills((new Date).getTime() - mills) + "</a>";
    //var blockLink = prettyPrintMills((new Date).getTime() - mills);
    var hashLink = "Txid: <a href='/chain/" + hash + "'>" + shorten(hash) + "</a>";
    //var transferLink = getAddressLink(from) + "<span class='glyphicon glyphicon-chevron-right'></span>" + getAddressLink(to);
    if (isSent) {
        transferLink = "To: <span class='glyphicon glyphicon-chevron-right'></span>" + getAddressLink(to);
    }
    else {
        transferLink = "From: <span class='glyphicon glyphicon-chevron-left'></span>" + getAddressLink(from);
    }
    return "<div style='background-color:rgb(240, 230, 230);padding:5px'>" + hashLink + "<span style='float:right'>" + blockLink + "</span></div><div style='background-color:rgb(230, 240, 230);text-align:left;padding:5px;margin-bottom:7px'>" + transferLink + "<span style='float:right'>" + weiToString(parseInt(amt)) + "</span></div>";
}

var createPendingDiv = function(block, from, to, amt, hash, mills, isSent) {
    var blockLink = "<a href='/chain/" + parseInt(block) + "'> " + prettyPrintMills((new Date).getTime() - mills) + "</a>";
    //var blockLink = prettyPrintMills((new Date).getTime() - mills);
    var hashLink = "Pending Txid: <a href='/chain/" + hash + "'>" + shorten(hash) + "</a>";
    //var transferLink = getAddressLink(from) + "<span class='glyphicon glyphicon-chevron-right'></span>" + getAddressLink(to);
    if (isSent) {
        transferLink = "To: <span class='glyphicon glyphicon-chevron-right'></span>" + getAddressLink(to);
    }
    else {
        transferLink = "From: <span class='glyphicon glyphicon-chevron-left'></span>" + getAddressLink(from);
    }
    return "<div style='background-color:rgb(240, 230, 230);padding:5px'>" + hashLink + "<span style='float:right'>" + blockLink + "</span></div><div style='background-color:rgb(252, 248, 227);text-align:left;padding:5px;margin-bottom:7px'>" + transferLink + "<span style='float:right'>" + weiToString(parseInt(amt)) + "</span></div>";
}

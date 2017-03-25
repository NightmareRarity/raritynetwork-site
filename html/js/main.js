window.onload = function() {

    var pg = particleground(document.getElementById('particles'), {
        dotColor: '#83509f',
        lineColor: '#5e4fa2',
        lineWidth: '.3',
        particleRadius: '4',
        density: '12000',
        parallaxMultiplier: '15'
    });

    var rararaimg = document.getElementById("rararaimg");
    var ddgimg = document.getElementById("ddg");
    var part = document.getElementById("particles");
    var switch1 = document.getElementById("switch1");
    var switch2 = document.getElementById("switch2");

    var partback = getCookie("ParticleBackground");
    if (partback == "") { setCookie("ParticleBackground", "on", 999); partback = "on"; }
    else if (partback == "off") { pg.pause(); part.className = ""; switch1.checked = false; }

    var nightmare = getCookie("Nightmare");
    if (nightmare == "") { setCookie("Nightmare", "off", 999); nightmare = "off"; }
    else if (nightmare == "on") { setNightMare(); switch2.checked = true; }

    document.getElementById("set-btn").addEventListener("click",function() {
        var switch1 = document.getElementById("switch1");
        var switch2 = document.getElementById("switch2");
        var part = document.getElementById("particles");

        if (document.getElementById("set-btn").className == "settings-btn") {
            document.getElementById("set-btn").className = "settings-btn settings-btn-open";
        } else if (document.getElementById("set-btn").className == "settings-btn settings-btn-open closed") {
            document.getElementById("set-btn").className = "settings-btn";
        }

        if (switch1.checked) {
            if (part.className != "playing") { pg.start(); part.className = "playing"; setCookie("ParticleBackground", "on", 999); }}
        else { pg.pause(); part.className = ""; setCookie("ParticleBackground", "off", 999); }

        if (switch2.checked) { setNightMare(); setCookie("Nightmare", "on", 999); }
        else { removeNightMare(); setCookie("Nightmare", "off", 999); }

        var nightmare = getCookie("Nightmare");
    },false);

    document.getElementById("set-exit-btn").addEventListener("click",function() {
        document.getElementById("set-btn").className = "settings-btn settings-btn-open closed";
    },false);
}
function setNightMare() {
    if (!document.getElementById('NightMareCSS')) {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = 'NightMareCSS';
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = 'css/NightMare.css';
        link.media = 'all';
        head.appendChild(link);
        rararaimg.src = "img/night_rarara_01.png";
        rararaimg.parentNode.href = "https://derpibooru.org/search?utf8=%E2%9C%93&sbq=nmr";
        ddg.src = "img/ddg2.svg";
    }
}
function removeNightMare() {
    var NightMareCSSLink = document.getElementById("NightMareCSS");
    NightMareCSSLink.parentNode.removeChild(NightMareCSSLink);
    rararaimg.src = "img/rarara_01.png";
    rararaimg.parentNode.href = "https://derpibooru.org/search?utf8=%E2%9C%93&sbq=ry";
    ddg.src = "img/ddg.svg";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

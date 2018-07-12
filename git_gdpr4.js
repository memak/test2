var gdpr = (function () {
    var domain, bar, layer;
    var acceptedCookie = 'gdpr_accepted';
    var seenCookie = 'gdpr_seen';
    var funcOptin = {cookie: 'opt_out_functional', title: 'Erforderliche Cookies', desc: 'Funktionale Cookies unterstützen die Nutzbarkeit der Unitymedia-Website. Dabei werden grundlegende Funktionen der Website, wie etwa Login, Seitennavigation oder die Speicherung der Produkte in Ihrem Warenkorb während der Sitzung, ermöglicht. Ohne diese Cookies funktioniert die Website nicht richtig. Weitere Informationen finden Sie <a href="' + getLpLink() + '" target="_blank">hier</a>.'};

    var cookieWhiteList = {
      mkt: new RegExp("43149|43275|75352|75351|43315|43263|43281|32147|43150|63134|75363|43289|63135|38221|32207|32208|43261|43326|43328|43269|32206|44209|44219|44210|44220|48288|48289|48287|38113|38114|38112|34269|34270|43331|44221|48291|48292|48290|38107|38108|38106|38118|38119|43332|44222|38116|38117|38115|38110|38111|38109|38120|38121|43145|43144|43271|75362|43288|43313|78334|43314|33423|33444|78339|43270|78331|78340|32969|32971|32970|48286|32302|43148|43265|63003|32974|32973|32972|43306|43329|32968|43147|43264|63004|43307|43330|32977|32976|32975|48574|48536|48537|48538|48539|48540|48541|48542|48543|48545|48544|33880|43175|32821|43317|43282|43290|34441|34442|34443|44218|44214|44212|44217|44211|44213|44216|44215|394042|526233|48640|48641|48642|48643|48644|48632|48633|48576|48575")
    };
    
    var deleteCookies = {
        opt_out_analytics: [{name: 'aam_uuid', domain: null}, {name: 'dextp', domain: '.demdex.net'}, {name: 'dpm', domain: '.demdex.net'}, {name: 'DST', domain: '.demdex.net'}, {name: '127', domain: '.demdex.net'}, {name: 'demdex', domain: '.demdex.net'}, {name: 'AMCV_#', domain: '.unitymediabusiness.de'}, {name: 'AMCVS_#AdobeOrg', domain: '.unitymediabusiness.de'}, {name: 's_cc', domain: null}, {name: 's_sq', domain: null}, {name: 's_fid', domain: null}, {name: 'client_info', domain: null}, {name: 'pa-l', domain: null}, {name:'pa-l_enabled', domain: null}, {name: '__cfduid', domain: '.pingdom.net'}, {name: 'ruxitagentjs__Store', domain: null}, {name: 'PIWIK_SESSID', domain: '.analytics.brandslisten.com'}, {name: '_pk_id#', domain: '.community.unitymedia.de'}, {name: '_pk_ses#', domain: '.community.unitymedia.de'}, {name: 'img/beacon.gif', domain: '.img/beacon.gif'}, {name: 's_pec', domain: null}, {name: 's_sess', domain: null}, {name: 's_pers', domain: '.unitymediabusiness.de'}, {name: 'businessVisit', domain: null}, {name: 'businessVisitCalled', domain: null}, {name: 'JSESSIONID', domain: '.nr-data.net'}, {name: 'rxVisitor', domain: null}, {name: 'rxvt', domain: null}, {name: 'dtCookie', domain: null},  {name: 'dtCookie', domain: 'www-unitymedia-de.uat.upc.biz'},  {name: 'dtCookie', domain: null}, {name: 'leo', domain: '.gacela.eu'}, {name: 'um_dynatrace_enabled', domain: null}],
        opt_out_mkt: [{name: 'click', domain: null, whitelist: 'mkt'}, {name: 'post_view', domain: null, whitelist: 'mkt'}],
        opt_out_social: [{name: 'impression.php/#', domain: '.facebook.com'}, {name: 'tr', domain: '.facebook.com'}, {name: 'GPS', domain: '.youtube.com'}, {name: 'PREF', domain: '.youtube.com'}, {name: 'VISITOR_INFO1_LIVE', domain: '.youtube.com'}, {name: 'YSC', domain: '.youtube.com'}, {name: 'pixel', domain: '.outbrain.com'}],
        opt_out_extmkt: [{name: '0', domain: '.adform.net'}, {name: 'cid', domain: '.adform.net'}, {name: 'uid', domain: '.adform.net'}, {name: 'rtrgt_17231', domain: '.redintelligence.net'}, {name: 'uid', domain: '.redintelligence.net'}, {name: '8lcfmzhxc8d6_uid', domain: '.redintelligence.net'}, {name: 'rtrgt_17231', domain: '.redintelligence.net'}, {name: 'ev_sync_dd', domain: '.everesttech.net'}, {name: 'everest_g_v2', domain: '.everesttech.net'}, {name: 'everest_session_v2', domain: '.everesttech.net'}, {name: 's_vi_lizx7Ex7Cktxxwx604zvttlwpmx604mx7Cjm', domain: '.omtrdc.net'}, {name: 'IDE', domain: '.doubleclick.net'}, {name: 'test_cookie', domain: '.doubleclick.net'}, {name: 'ads/user-lists/#', domain: '.google.com'}],
        to_delete: [{name: 'collect', domain: '.google-analytics.com'}, {name: 'csrftoken', domain: '.instagram.com'}, {name: 'mid', domain: '.instagram.com'}, {name: 'rur', domain: '.instagram.com'}, {name: 'urlgen', domain: '.instagram.com'}, {name: 'i/jot', domain: '.twitter.com'}, {name: 'i/jot/syndication', domain: '.twitter.com'}, {name: 'lang', domain: '.cdn.syndication.twimg.com'}, {name: 'KRTBCOOKIE_#', domain: '.pubmatic.com'}, {name: 'PUBMDCID', domain: '.pubmatic.com'}, {name: 'PugT', domain: '.pubmatic.com'}, {name: 'c', domain: '.rubiconproject.com'}, {name: 'khaos', domain: '.rubiconproject.com'}, {name: 'put_#', domain: '.rubiconproject.com'}, {name: 'rpx', domain: '.rubiconproject.com'}, {name: 'i', domain: '.openx.net'}, {name: 'id', domain: '.yieldlab.net'}, {name: '_csrf', domain: '.screenshots.firefoxusercontent.com'}, {name: 'abtests', domain: '.screenshots.firefoxusercontent.com'}, {name: 'abtests.sig', domain: '.screenshots.firefoxusercontent.com'}, {name: 'LCSess', domain: '.lancom-systems.de'}]
    };

    var optins = [
        {cookie: 'opt_out_analytics', title: 'Analysecookies', desc: 'Diese Cookies geben Unitymedia ein Verständnis davon, wie die Besucher Website agieren (bspw. wie lange Besucher im Durchschnitt auf einer Seite bleiben, ob und wie oft sie wiederkehren) und ermöglicht eine laufende Verbesserung der Webseite. Weitere Informationen finden Sie <a href="' + getLpLink() + '" target="_blank">hier</a>.'},
        {cookie: 'opt_out_mkt', title: 'Marketing auf unseren Webseiten', desc: 'Diese Cookies dienen dazu Ihren Warenkorb bis zu Ihrem nächsten Besuch unserer Webseite zu speichern und Ihnen passende Produkte während Ihres Besuchs unserer Seiten anbieten zu können. Weitere Informationen finden Sie <a href="' + getLpLink() + '" target="_blank">hier</a>.'},
        {cookie: 'opt_out_social', title: 'Soziale Medien', desc: 'Wir setzen auf der Website Cookies sozialer Medien ein, um bspw. die Schaltflächen sozialer Medien aktivieren zu können. Damit ist auch der Zugang zu sozialen Medien möglich und das Surfen auf unseren und anderen Webseiten kann durch den Betreiber des sozialen Netzwerks verfolgt werden. Weitere Informationen finden Sie <a href="' + getLpLink() + '" target="_blank">hier</a>.'},
        {cookie: 'opt_out_extmkt', title: 'Marketing auf anderen Webseiten', desc: 'Cookies zu Marketingzwecken folgen dem Nutzer auch auf andere Webseiten. Der Zweck ist dem Benutzer Angebote zu zeigen, die für ihn wichtig oder interessant sind. Sie sind aus diesem Grund wertvoll für werbetreibende Dritte und Publisher. Weitere Informationen finden Sie <a href="' + getLpLink() + '" target="_blank">hier</a>.'}
    ];

    var term = 28*24*60*60*1000;
    var optoutTerm = 100*365*24*60*60*1000;

    function setCookie (key, value, expire) {
        if (expire != null) {
            var expireDate = new Date();
            expireDate.setTime(expireDate.getTime() + expire);
            expires = ';expires=' + expireDate.toUTCString();
        }
        document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + expires + ';path=/;domain=' + domain;
    }

    function removeCookie (key, curDomain) {
        var cookieOpts = '=; Max-Age=-99999999;path=/;domain=' + (!!curDomain ? curDomain : domain);
        //we don't know if third-party encodes the keys -> also try deleting encoded key
        document.cookie = key + cookieOpts;
        document.cookie = encodeURIComponent(key) + cookieOpts;
        
        console.log("remove cookie: " + encodeURIComponent(key) + cookieOpts);
    }

    function getCookie (cookieName) {
        var cookies = document.cookie ? document.cookie.split(';') : [];
        var val;
        cookies.forEach(function(c) {
            var arr = c.trim().split('=');
            if (decodeURIComponent(arr[0]) === decodeURIComponent(cookieName)) {
                val = decodeURIComponent(arr[1]);
            }
        });
        return val;
    }

    function getCheckboxes() {
        var checkboxes = '<label><input type="checkbox" checked disabled style="display:inline-block;width:auto;" name="' + funcOptin.cookie + '"/>' + funcOptin.title + '</label>';
        checkboxes += '<div style="font-size:.8em;margin:0 0 1em 18px;">' + funcOptin.desc + '</div>';
        optins.forEach(function (el) {
            checkboxes += '<label><input type="checkbox" ' + (!!getCookie(el.cookie) ? '' : 'checked ') + 'style="display:inline-block;width:auto;" name="' + el.cookie + '"/>' + el.title + '</label>';
            checkboxes += '<div style="font-size:.8em;margin:0 0 1em 18px;">' + el.desc + '</div>';
        });
        return checkboxes;
    }

    function openLayer () {
        layer = document.createElement('div');
        layer.style.background = 'rgba(0,0,0,.5)';
        layer.style.position = 'fixed';
        layer.style.top = '0';
        layer.style.bottom = '0';
        layer.style.left = '0';
        layer.style.right = '0';
        layer.style.zIndex = '999';
        layer.style.display = 'flex';
        layer.style.alignItems = 'center';
        layer.style.justifyContent = 'center';

        var dialog = document.createElement('div');
        dialog.style.width = '80vw';
        dialog.style.maxWidth = '800px';
        dialog.style.background = '#fff';
        dialog.style.borderRadius = '5px';
        dialog.style.padding = '20px';
        dialog.style.color = '#000';
        dialog.style.boxShadow = '0 0 20px rgba(0,0,0,0.2)';
        dialog.style.overflowY = 'auto';
        dialog.style.maxHeight = '60vh';
        dialog.innerHTML = '<div style="font-size:2em;font-family:bloomspeak,Arial,Helvetica,sans-serif;color:#002c77;">Ihre Einstellungen zu Cookies für diese Website</div><div style="margin-bottom:1em;">Durch Cookies werden Zugriffe auf unserer Website gemessen und Funktionen für soziale Medien und Marketing realisiert. Wir geben auch Informationen an unsere Partner für Analysen, Marketing und soziale Medien weiter. Unsere Partner können diese Informationen mit weiteren, von Ihnen mitgeteilten Daten oder anderen, die sie durch die Verwendung ihrer Dienste gesammelt haben, zusammenführen. Sie können dieser Verwendung in verschiedenen Abstufungen widersprechen. Wählen Sie dazu bitte Ihre persönliche Präferenz. Weitere Informationen finden sie <a href="' + getLpLink() + '" target="_blank">hier</a>.</div>' + getCheckboxes();

        var applyBtn = document.createElement('button');
        applyBtn.style.border = 'solid 1px #40920F';
        applyBtn.style.background= '#40920F';
        applyBtn.style.color = '#fff';
        applyBtn.style.padding = '8px 12px';
        applyBtn.style.borderRadius = '50px';
        applyBtn.style.marginRight = '8px';
        applyBtn.innerHTML = 'Eingaben bestätigen';
        applyBtn.onclick = function (e) {
            e.preventDefault();
            applyCookies();
        }.bind(this);
        dialog.appendChild(applyBtn);

        var abortBtn = document.createElement('button');
        abortBtn.style.border = 'solid 1px #40920F';
        abortBtn.style.color = '#40920F';
        abortBtn.style.padding = '8px 12px';
        abortBtn.style.borderRadius = '50px';
        abortBtn.innerHTML = 'Abbrechen';
        abortBtn.onclick = function (e) {
            e.preventDefault();
            closeLayer();
        }.bind(this);
        dialog.appendChild(abortBtn);

        layer.appendChild(dialog);
        document.body.appendChild(layer);
    }
    
    function handleDynatrace (enabled) {
        if (window.dtrum) {
            if (enabled) {
                if (getCookie('um_dynatrace_enabled') !== 'true') {
                    dtrum.enable();
                    setCookie('um_dynatrace_enabled', 'true', optoutTerm);
                }
            } else {
                dtrum.disable();
            }
        }
    }

    function applyCookies () {
        optins.forEach(function (optout) {
            var el = layer.querySelector('input[name="' + optout.cookie + '"]');
            var elChecked = !!el && el.checked;
            
            if (!elChecked) {
                setCookie(optout.cookie, true, optoutTerm);
                clearCookieCategory(optout.cookie);
            } else {
                removeCookie(optout.cookie);
            }
            
            if (optout.cookie === 'opt_out_analytics') {
                handleDynatrace(elChecked);
            }
        });
        setCookie(acceptedCookie, 'true', term);
        
        setTimeout(function() {
            window.location.reload();
        }, 300);
    }

    function closeLayer () {
        document.body.removeChild(layer);
    }

    function openBar () {
        bar = document.createElement('div');

        bar.style.backgroundColor = '#0077D0';
        bar.style.color = '#fff';
        bar.style.padding = '20px';
        bar.style.position = 'relative';
        bar.style.zIndex = '998';

        if (typeof ume != 'undefined' && ume.mobile) {
            bar.style.marginTop = '50px';
            bar.style.marginBottom = '-50px';
        }

        bar.innerHTML = '<div style="max-width:1400px;margin:0 auto;"><div style="font-size:1.6em;font-family:bloomspeak,Arial,Helvetica,sans-serif;">Unitymedia respektiert Ihren Datenschutz</div><div style="margin-bottom:1em;">Auf den Webseiten von Unitymedia werden verschiedene Arten von Cookies mit unterschiedlichen Funktionen eingesetzt. Diese dienen einerseits rein technischen Funktionen, anderseits auch der Optimierung der Webseiten, der Interaktionen mit sozialen Medien sowie der nutzungsbezogenen Werbung auf unseren Seiten als auch auf Seiten von Partnern. Sie können dem Einsatz der Cookies zu Werbe- und Analysezwecken in verschiedenen Stufen widersprechen. Klicken Sie auf „Verstanden und fortfahren", um die Cookies zu akzeptieren oder klicken Sie auf „Einstellungen", um Ihre persönlichen Cookie-Einstellungen zu wählen.<br/><a href="' + getLpLink() + '" target="_blank" style="color:#fff;text-decoration:underline;">&gt; Weitere Informationen</a></div></div>';

        var acceptBtn = document.createElement('button');
        acceptBtn.innerHTML = 'Verstanden und fortfahren';
        acceptBtn.style.background = '#fff';
        acceptBtn.style.border = 'solid 1px #fff';
        acceptBtn.style.color = '#0077D0';
        acceptBtn.style.padding = '8px 12px';
        acceptBtn.style.borderRadius = '50px';
        acceptBtn.style.marginRight = '8px';
        acceptBtn.onclick = function (e) {
            e.preventDefault();
            setCookie(acceptedCookie, 'true', term);
            window.location.reload();
        }.bind(this);
        bar.querySelector('div').appendChild(acceptBtn);

        var openBtn = document.createElement('button');
        openBtn.innerHTML = 'Einstellungen';
        openBtn.style.background = 'transparent';
        openBtn.style.border = 'solid 1px #fff';
        openBtn.style.color = '#fff';
        openBtn.style.padding = '8px 12px';
        openBtn.style.borderRadius = '50px';
        openBtn.onclick = function (e) {
            e.preventDefault();
            openLayer();
        }.bind(this);
        bar.querySelector('div').appendChild(openBtn);

        document.body.insertBefore(bar, document.body.firstElementChild);
    }

    function clearCookieCategory (category) {
        if(!!deleteCookies[category]) {
            deleteCookies[category].forEach(function (el) {
                if(!(el.whitelist && cookieWhiteList[el.whitelist] && cookieWhiteList[el.whitelist].test(getCookie(el.name)))) {
                    console.log('remove clearCat = ' + el.name);
                    removeCookie(el.name, el.domain);
                }
            });
        }
    }

    /* handle dynamic links to landingpages */
    function getLpLink () {        
        var location = window.location.href;
        var lpLink = "https://www.unitymedia.de/datenschutz";

        if (location.search("unitymediabusiness.de") != -1 || location.search("unitymedia.de/business") != -1 || location.search("upc.biz/business") != -1) {
            lpLink = "https://www.unitymedia.de/business/datenschutz/";
        }
        if (location.search("horizon.tv") != -1) {
            lpLink = "https://www.horizon.tv/de_de/datenschutz.html";
        }
        return lpLink;
    }

    return {
        init: function () {
            clearCookieCategory('to_delete');
            var hostname = window.location.hostname.split('.');
            domain = hostname.length < 2 ? window.location.hostname : ['', hostname[hostname.length-2],hostname[hostname.length-1]].join('.');
            if (!!getCookie(acceptedCookie)) {
                return;
            }

            openBar();

            setCookie(seenCookie, 'true', term);

            handleDynatrace(true);
        },
        change: function () {
            openLayer();
        }
    };
})();

document.addEventListener("DOMContentLoaded", function() {
    gdpr.init();
});

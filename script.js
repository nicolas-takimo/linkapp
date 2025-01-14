(function () {
    'use strict';

    var module = {
        options: [],
        header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
        dataos: [
            { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
            { name: 'Windows', value: 'Win', version: 'NT' },
            { name: 'iPhone', value: 'iPhone', version: 'OS' },
            { name: 'iPad', value: 'iPad', version: 'OS' },
            { name: 'Android', value: 'Android', version: 'Android' },
            { name: 'Macintosh', value: 'Mac', version: 'OS X' },
            { name: 'Linux', value: 'Linux', version: 'rv' }
        ],
        databrowser: [
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
        ],
        init: function () {
            var agent = this.header.join(' '),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);

            // Verifica o sistema operacional e redireciona para a loja apropriada
            this.redirectToStore(os.name);

            return { os: os, browser: browser };
        },
        matchItem: function (string, data) {
            var i = 0, regex, match, regexv, matches, version;

            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, 'i');
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                    matches = string.match(regexv);
                    version = matches && matches[1] ? matches[1] : '0';
                    return {
                        name: data[i].name,
                        version: parseFloat(version)
                    };
                }
            }
            return { name: 'unknown', version: 0 };
        },
         redirectToStore: function (osName) {
            var playStoreLink = 'https://play.google.com/store/apps/details?id=com.koddex.beautyfair&hl=pt_BR';
            var appStoreLink = 'https://apps.apple.com/us/app/c3-o-clube-da-constru%C3%A7%C3%A3o-civil/id6740501046';

            if (osName === 'Android') {
                window.location.href = playStoreLink;
            } else if (osName === 'iPhone' || osName === 'iPad') {
                window.location.href = appStoreLink;
            } else {
                console.log('Sistema operacional não suportado para redirecionamento automático.');
            }
        }
    };
    

    var e = module.init();
    var debug = '';

    debug += 'os.name = ' + e.os.name + '<br/>';
    debug += 'os.version = ' + e.os.version + '<br/>';
    debug += 'browser.name = ' + e.browser.name + '<br/>';
    debug += 'browser.version = ' + e.browser.version + '<br/>';

    debug += '<br/>';
    debug += 'navigator.userAgent = ' + navigator.userAgent + '<br/>';
    debug += 'navigator.appVersion = ' + navigator.appVersion + '<br/>';
    debug += 'navigator.platform = ' + navigator.platform + '<br/>';
    debug += 'navigator.vendor = ' + navigator.vendor + '<br/>';

    document.getElementById('log').innerHTML = debug;
}());

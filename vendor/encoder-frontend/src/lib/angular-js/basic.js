window['angular'].service('$basic', function () {

    this.a = function (a) {
        return alert(a);
    };


    this.call = function (function_name, args) {
        window[function_name](args);
    };

    this.mobile = function () {
        return mobile();
    };

    this.globals = {
        set: function (key, value) {
            window['globals'][key] = value;
        },
        get: function (key) {
            return window['globals'][key];
        }
    }

    this.acronym = function (a) {
        return acronym(a);
    };

    this.type = function (a) {
        return type(a);
    };

    this.brl_to_float = function (a, b) {
        return brl_to_float(a, b);
    };

    this.float_to_brl = function (a) {
        return float_to_brl(a);
    };

    this.float_to_brl_clean = function (a) {
        return float_to_brl_clean(a);
    };

    this.fix_brl = function (a) {
        return fix_brl(a);
    };

    this.float_fix = function (a, b) {
        return float_fix(a, b);
    };

    this.object_length = function (a) {
        return object_length(a);
    };

    this.l = function (a) {
        return l(a);
    };

    this.no_left_zeros = function (a) {
        return no_left_zeros(a);
    };

    this.to_f = function (a) {
        return parseFloat(a);
    };

    this.currency_to_float = function (a) {
        return currency_to_float(a);
    };

    this.float_to_currency = function (a) {
        return float_to_brl_clean(a)
    };

    this.utc_to_local = function (a) {
        return utc_to_local(a);
    };

    this.utc_to_local_no_time = function (a) {
        return utc_to_local_no_time(a);
    };

    this.url_param = function (a) {
        return url_param(a);
    };

    this.date_current = function () {
        return date_current();
    };

    this.data_explode = function (a) {
        return data_explode(a);
    };

    this.mask_card_code = function (a) {
        return mask_card_code(a);
    };

    this.str_limit = function (a) {
        if (a != undefined)
            return str_limit(a);
    };

    this.delete = function (array, key) {
        delete array[key];
    };
    
    this.delete_with_scope = function (array, key, scope) {
        delete array[key];
        scope.$apply();
    };

    this.token = function () {
        return token();
    };

    this.len = function (s) {
        return len(s);
    };

    this.json = function (s) {
        if (s)
            return json(s);

        return ''
    };

    this.date_compare = function (a, b) {
        return date_compare(a, b);
    };

    this.date_compare_br = function (a, b) {
        return date_compare_br(a, b);
    };

    this.date_str_br = function (a) {
        return date_str_br(a);
    };

    this.loading = function () {
        loading();
    };

    this.date_today = function () {
        var t = new Date();
        var d = ("0" + t.getDate()).slice(-2);
        var m = ("0" + (t.getMonth() + 1)).slice(-2);
        var h = ("0" + t.getHours()).slice(-2);
        var min = ("0" + t.getMinutes()).slice(-2);

        return (d + '/' + (m) + '/' + t.getFullYear() + ' ' + h + ':' + min)
    };

    this.date_time_compare = function (a, b) {
        return date_compare_time(a, b);
    };

    this.date_is_future = function (a) {
        return date_is_future(a);
    };
    
    this.greater_than_31_days = function (a, b) {
        return greater_than_31_days(a, b);
    };
    
    this.greater_than_45_days = function (a, b) {
        return greater_than_45_days(a, b);
    };

    this.date_str_br_full = function (a) {
        return date_str_br_full(a);
    };

    this.date_get_hour = function (a) {
        return date_get_hour(a);
    };

    this.key = function (a, k) {
        return k in a;
    };

    this.sort = function (box_selector, item_selector, dataset_index, asc = false) {
        console.log('chegou 1')
        return sort(box_selector, item_selector, dataset_index, asc);
    };

});


import $ from "jquery";
jQuery = $;

function a(str) {
   alert(str);
}



/**
 * Apresenta no console.log o conteudo de {data}.
 *
 * @param {any} data
 * @returns {boid}
 */
function l(data) {
    console.log(data);
}


/**
 * Retira todos os caracteres nao numericos de uma string.
 *
 * @param {string} str
 * @returns {string}
 */
function only_numbers(str) {
    return str.match(/\d+/g).join('');
}


function get_user_time_to_expire() {
    var date = new Date(new Date());
    date.setMinutes(date.getMinutes() + 240);
    return date;
}


function get_date_to_extract() {
    var date = new Date(new Date());
    date.setMonth(date.getMonth() - 3);
    return date.toISOString();
}


function toFloat(string_number) {
    return parseFloat(string_number);
}


function brl_to_float(brl) {
    brl = '' + brl;

    // "R$ 1.234,56" -> "R$1.234,56"
    brl = brl.replace(/\s/g, '');

    // "R$1.234,56" -> "1234,56"
    brl = brl.replace(/[^\d|\,]/g, '');

    // "R$1.234,56" -> "," | two or more virgules ?
    if (brl.replace(/[^,]/g, '').length > 1)
        return -1;

    // "R$1.234,56" -> "56" | two more digits for cents ?
    var cents = brl.split(',');
    if (cents[1] != undefined && (cents[1].length > 2))
        return -2;

    // "1234,56" -> "1234.56"
    brl = brl.replace(/\,/g, '.');

    // "1234.56" -> 1234.56
    brl = parseFloat(brl);
    return parseFloat(brl.toFixed(2));
}


function float_to_brl(val, options) {
    if (val == null)
        val = 0;

    // https://pt.stackoverflow.com/questions/215656/formatar-string-ou-float-para-moeda

    var brl = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(parseFloat(val));

    if (type(options) == 'object') {
        if (options.sign == false)
            brl = $.trim(brl.replace('R$', ''));

        if (options.points == false)
            return brl.replace(/\./, '');
    }

    val = brl.trim() + "";
    val = val.replace(/\s/g, '');

    return val;
}


function float_to_brl_clean(val) {
    return float_to_brl(val, { sign: false });
}


function type(val) {
    return jQuery.type(val);
}


function no_left_zeros(val) {
    return (val + "").replace(/^(0+)(\d)/g, '$2');
}


function object_length(obj) {
    try {
        return Object.keys(obj).length;
    } catch (err) {
        return 0;
    }
}


function fix_brl(val_brl) {
    var val_float = brl_to_float(val_brl) || 0;

    if (val_float == 0)
        return '0,00';

    if ((val_brl.indexOf(',') != -1
        && val_float > 1
        && val_brl.charAt(0) == '0')) {
        return float_to_brl_clean(val_float);
    }

    if (val_brl.length > 2)
        return float_to_brl_clean(val_float);

    return val_brl;
}


function mask_cpf(cpf) {
    return (cpf + "").replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
}


/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally
 * @return undefined
 */
function ipv4_private_callable(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
        noop = function () { },
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;

    function iterateIP(ip) {
        if (!localIPs[ip])
            onNewIP(ip);
        localIPs[ip] = true;
    }

    //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0)
                return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function (reason) {
        // An error occurred, so handle the failure to connect
    });

    //listen for candidate events
    pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex))
            return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}


function ipv4_public() {
    var ip = '000.000.000.000/00';

    $.ajax({
        url: 'https://api.ipify.org/?format=json',
        async: false,
        success: function (data) {
            ip = data.ip;
        }
    });

    return ip;
}


function browser_info() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // In Opera 15+, the true version is after "OPR/"
    if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 4);
    }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome"
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox"
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
        (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }

    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    return browserName + ' ' + fullVersion;
}


function request_info(ipv4) {
    if (ipv4 == undefined)
        return {
            os: navigator.platform,
            browser: browser_info()
        };

    return {
        ipv4_public: ipv4_public(),
        os: navigator.platform,
        browser: browser_info()
    };
}


/**
 * Converte uma moeda brasileira em float.
 *
 * @param {type} str
 *
 * @returns {float}
 */
function currency_to_float(current) {
    current = current.replace('.', '');
    current = current.replace(',', '.')
    return parseFloat(current.replace(',', '.'));
}


/**
 * Converte uma moeda brasileira em float.
 *
 * @param {type} str
 *
 * @returns {float}
 */
function float_to_currency(value) {
    value = parseFloat(value);
    value = value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    value = value.replace(',', '_');
    value = value.replace('.', ',');
    value = value.replace('_', '.');

    if (value == '-0,00')
        value = '0,00';

    return value;
}


//function utc_to_local(date) {
//    date = new Date(date);
//    return date.toLocaleString('pt-BR').substr(0, 16);
//}

function old_utc_to_local(date) {
    if (!date)
        return;

    date = new Date(date);
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate.toLocaleString('pt-BR').substr(0, 16);
}
function utc_to_local(date) {
    if (!date)
        return;

    year = date.substr(0, 4);
    month = date.substr(5, 2);
    day = date.substr(8, 2);
    hours = date.substr(11, 2);
    mins = date.substr(14, 2);

    date = new Date(Date.UTC(year, month - 1, day, hours, mins, 0, 0, 0));
    return date.toLocaleString('pt-BR').substr(0, 16);
}

function utc_to_local_full(date) {
    date = new Date(date);
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate.toLocaleString('pt-BR');
}


function utc_to_local_no_time(date) {
    date = new Date(date);
    return date.toLocaleString('pt-BR').substr(0, 10);
}

function date_current() {
    var date = new Date(new Date());
    return date.toLocaleString('pt-BR').substr(0, 16);
}

function data_explode(date) {
    date = utc_to_local(date);
    date = date.split(' ');

    var time = date[1].split(':');
    date = date[0].split('/');

    return {
        day: date[0],
        month: date[1],
        year: date[2],
        hour: time[0],
        min: time[1],
    };
}


function random_number(rage) {
    return Math.floor((Math.random() * rage) + 1);
}


function random_date() {
    var start = new Date(2017, 0, 1);
    return new Date(start.getTime() + Math.random());
}

function acronym(id) {
    return ACRONYMS[id];
}

function $app() {
    return angular.element("[ng-app='LivOffice']").scope().$app;
}

function modal_alone(name) {
    $('.modal').modal().modal('close');
    $('[data-modal="' + name + '"]').modal().modal('open');
}
function modal_close_all() {
    $('.modal').modal().modal('close');
}

function float_fix(value, boxes) {
    value = parseFloat(value).toFixed(boxes);

    // if (value == -0.00)
    if (value == 0.00)
        value = 0.00;

    return value;
}

function url_param(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

function mask_card_code(code) {
    return '**** **** **** ' + code.substr(12, 15);
}

function mobile() {
    return MOBILE;
}

function md5(s) {
    return $.md5(s);
}

function str_limit(str) {
    var len = 13;

    str = str.replace(/\SUPERMERCADO/g, '')

    if (str.length > len)
        return str.substring(0, len) + '...';

    return str;
}

function len(s) {
    if (s == '' || s == null || s == undefined)
        return 0;

    return s.length;
}

function json(s) {
    return JSON.stringify(s);
}

var rand = function () {
    return Math.random().toString(16).substr(2); // remove `0.`
};

var token = function () {
    return rand() + rand(); // to make it longer
};


function date_compare(str_less, str_greather) {
    if (len(str_less) <= 0 || len(str_greather) <= 0)
        return null;

    var str_less = new Date(str_less);
    var str_greather = new Date(str_greather);

    if (str_less == str_greather)
        return 0;

    if (str_less > str_greather)
        return 1;

    if (str_less < str_greather)
        return -1;

    return 0;
}


function date_is_future(date) {
    if (len(date) <= 0)
        return null;

    date = new Date(date);
    var dateNow = Date.now();

    if (date <= dateNow)
        return false;

    return true;
}

function greater_than_31_days(str_less, str_greather) {
    if (len(str_less) <= 0 || len(str_greather) <= 0)
        return null;

    var str_less = new Date(str_less);
    var str_greather = new Date(str_greather);

    var Difference_In_Time = str_greather.getTime() - str_less.getTime();
    var Difference_In_Days = (Difference_In_Time / (1000 * 3600 * 24)) + 1;

    if (Difference_In_Days > 31)
        return true;

    return false;
}

function greater_than_45_days(str_less, str_greather) {
    if (len(str_less) <= 0 || len(str_greather) <= 0)
        return null;

    var str_less = new Date(str_less);
    var str_greather = new Date(str_greather);

    var Difference_In_Time = str_greather.getTime() - str_less.getTime();
    var Difference_In_Days = (Difference_In_Time / (1000 * 3600 * 24)) + 1;

    if (Difference_In_Days > 45)
        return true;

    return false;
}

function less_than_15_days(str_less, str_greather) {
    if (len(str_less) <= 0 || len(str_greather) <= 0)
        return null;

    var str_less = new Date(str_less);
    var str_greather = new Date(str_greather);

    var Difference_In_Time = str_greather.getTime() - str_less.getTime();
    var Difference_In_Days = (Difference_In_Time / (1000 * 3600 * 24)) + 1;

    if (Difference_In_Days < 15)
        return true;

    return false;
}

function datetime_br_to_universal(date) {
    date = date.split(' ');
    var hours = date[1];
    date = date[0].split('/');

    return date[1] + '-' + date[0] + '-' + date[2] + ' ' + hours;
}

function date_compare_br(str_less, str_greather) {
    if (str_less.length != 16 || str_greather.length != 16)
        return;

    if (len(str_less) <= 0 || len(str_greather) <= 0)
        return null;

    var str_less = new Date(datetime_br_to_universal(str_less));
    var str_greather = new Date(datetime_br_to_universal(str_greather));

    if (str_less == str_greather)
        return 0;

    if (str_less > str_greather)
        return 1;

    if (str_less < str_greather)
        return -1;

    return 0;
}


// 2019-02-01 > 01/02/2019
function date_str_br(date) {
    if (len(date) <= 0)
        return null;

    date = date.split(' ');
    date = date[0].split('-');

    return date[2] + '/' + date[1] + '/' + date[0];
}

// 2019-02-01 11:59 > 01/02/2019 11:59
function date_str_br_full(date) {
    if (len(date) <= 0)
        return null;

    date = date.split(' ');
    var hours = date[1];
    date = date[0].split('-');
    ;

    var d = date[2];
    var m = date[1];
    var y = date[0];

    return (d + '/' + m + '/' + y + ' ' + hours);
}

function date_get_hour(date) {
    if (len(date) <= 0)
        return null;

    date = date.split(' ');

    return date[1];
}

var rand_pass = function () {
    return Math.random().toString(16).substr(2, 5); // remove `0.`
};


var sort = function (boxes_selector, item_selector, dataset_index, asc = false) {
    $(document).ready(function() {
        $(boxes_selector).each(function (i, box) {
            $(item_selector, $(box)).sort(function(a, b) {
                // var value_a = a.dataset[dataset_index] == 'null' ? -999999999999999 : parseFloat(a.dataset[dataset_index]);
                // var value_b = b.dataset[dataset_index] == 'null' ? -999999999999999 : parseFloat(b.dataset[dataset_index]);
                var value_a = parseFloat(a.dataset[dataset_index]);
                var value_b = parseFloat(b.dataset[dataset_index]);

                if (asc) // ASC: Ordernar do menor para o maior.
                    return value_a - value_b;
                else // DESC: Ordernar do maior para o menor.
                    return value_b - value_a;
            }).appendTo($(box));
        });
    });
}
window.sort = sort;
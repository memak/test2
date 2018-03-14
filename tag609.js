//tealium universal tag - utag.609 ut4.0.201803121047, Copyright 2018 Tealium.com Inc. All Rights Reserved.
alert(111111111);
try {
    if (jQuery) {
        jQuery(document).ready(function() {
            jQuery('form[data-widget=AddToBasket] button[type=submit]').click(function(e) {
                try {
                    utag.track('view', {
                        'event_name': 'AddToCart'
                    }, 609);
                } catch (e) {
                    console && console.error && console.error('An error occurred fireing the tealium tag with id ' + 609);
                }
            });
        });
    }
    (function(id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function(o) {
                var b, c, l, a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    };
                    for (l in utag.loader.GV(o.attrs)) {
                        b.setAttribute(l, o.attrs[l]);
                    }
                    b.setAttribute("src", o.src);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    for (l in utag.loader.GV(o.attrs)) {
                        b[l] = o.attrs[l];
                    }
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id
                }
                ;if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function() {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function() {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        }
                        ;
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l == "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b)
                    }
                }
            }
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function(e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            }
            ;
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        if (utag.ut.merge === undefined) {
            u.merge = function(a, b, c, d) {
                if (c) {
                    for (d in utag.loader.GV(b)) {
                        a[d] = b[d];
                    }
                } else {
                    for (d in utag.loader.GV(b)) {
                        if (typeof a[d] == "undefined") {
                            a[d] = b[d];
                        }
                    }
                }
            }
            ;
        } else {
            u.merge = utag.ut.merge;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.initialized = false;
        u.scriptrequested = false;
        u.queue = [];
        u.event_lookup = {
            "ViewContent": {
                obj: "vc",
                "map": ["value", "currency", "product_name", "product_ids", "content_category"]
            },
            "Search": {
                obj: "search",
                "map": ["value", "currency", "content_category", "product_ids"]
            },
            "AddToCart": {
                obj: "cart",
                "map": ["value", "currency", "product_name", "product_ids"]
            },
            "AddToWishlist": {
                obj: "wish",
                "map": ["value", "currency", "product_name", "product_ids"]
            },
            "InitiateCheckout": {
                obj: "cout",
                "map": ["value", "currency", "product_name", "product_ids", "num_items"]
            },
            "AddPaymentInfo": {
                obj: "payment",
                "map": ["value", "currency", "content_category", "product_ids"]
            },
            "Purchase": {
                obj: "purch",
                "map": ["value", "currency", "product_name", "product_ids", "num_items"]
            },
            "Lead": {
                obj: "lead",
                "map": ["value", "currency", "product_name", "content_category"]
            },
            "CompleteRegistration": {
                obj: "reg",
                "map": ["value", "currency", "product_name"]
            },
            "Conversion": {
                obj: "cnv",
                "map": ["value", "currency"]
            },
            "Custom": {
                obj: "cust",
                "map": []
            },
            "PageView": {
                obj: "page",
                "map": []
            }
        };
        u.std_params = {
            "value": function(g, event) {
                if (g.value === undefined || g.value === "") {
                    if (event === "ViewContent" || event === "AddToCart") {
                        g.value = u.data.ecom.product_unit_price;
                    } else {
                        g.value = u.data.ecom.order_subtotal;
                    }
                }
                g.value = u.val(g.value);
            },
            "currency": function(g) {
                if (!g.currency) {
                    g.currency = u.data.ecom.order_currency;
                }
            },
            "product_name": function(g) {
                if (!g.product_name) {
                    g.product_name = u.data.ecom.product_name;
                }
                g.product_name = u.val(g.product_name);
            },
            "product_ids": function(g) {
                if (!g.product_ids) {
                    g.product_ids = u.data.ecom.product_id;
                }
                if (u.typeOf(g.product_ids) !== "array") {
                    g.product_ids = g.product_ids.split(/\s*,\s*/);
                }
            },
            "content_category": function(g) {
                if (!g.content_category) {
                    g.content_category = u.data.ecom.product_category;
                }
                g.content_category = u.val(g.content_category);
            },
            "num_items": function(g) {
                if (!g.num_items && u.data.calc_items === "true") {
                    g.num_items = u.calc_items(u.data.ecom.product_quantity);
                }
            }
        };
        u.map_func = function(arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        }
        ;
        u.val = function(value) {
            return u.typeOf(value) === "array" ? value[0] : value;
        }
        ;
        u.remove_empty = function(a) {
            var b, t;
            for (b in utag.loader.GV(a)) {
                t = u.typeOf(a[b]);
                if (t === "object") {
                    u.remove_empty(a[b]);
                    if (u.isEmptyObject(a[b])) {
                        try {
                            delete a[b];
                        } catch (e) {
                            a[b] = undefined;
                        }
                    }
                } else if (!((a[b] === 0 || a[b] === false) ? !0 : (t === "array" && a[b].length === 0) ? !1 : !!a[b])) {
                    try {
                        delete a[b];
                    } catch (e) {
                        a[b] = undefined;
                    }
                }
            }
            return a;
        }
        ;
        u.calc_items = function(quan) {
            var q, i = 0;
            for (q = 0; q < quan.length; q++) {
                i += parseInt(quan[q]);
            }
            return i;
        }
        ;
        u.hasOwn = function(o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        }
        ;
        u.isEmptyObject = function(o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        }
        ;
        u.process_AM_data = function(_data) {
            var am_data = {}, item, val;
            for (item in utag.loader.GV(_data)) {
                val = _data[item];
                val = val.replace(/\s/g, "").toLowerCase();
                if (val === "ph") {
                    val = val.replace(/[^\d]/g, "");
                } else if (item === "ge") {
                    if (val !== "m" || val !== "f") {
                        utag.DB("[" + u.id + "] ge in wrong format. Removed from init call");
                        continue;
                    }
                } else if (item === "db") {
                    if (val.length !== 8) {
                        utag.DB("[" + u.id + "] db is not the correct length. Please check format. Removed from init call");
                        continue;
                    }
                } else if (item === "zp") {
                    val = val.replace(/[^\d]/g, "");
                    if (val.length > 5) {
                        utag.DB("[" + u.id + "] zp is too long. Removed from init call");
                        continue;
                    }
                }
                am_data[item] = val;
            }
            return u.isEmptyObject(am_data) ? undefined : am_data;
        }
        ;
        u.map = {
            "js_page.fb_event_type:Purchase": "Purchase",
            "js_page.fb_event_type:InitiateCheckout": "InitiateCheckout",
            "js_page.fb_event_type:ViewContent": "ViewContent",
            "js_page.oTagData.oOrder.sLeadProduct": "product_name",
            "js_page.oTagData.oOrder.sAdditionalProducts": "product_id",
            "js_page.oTagData.oOrder.nOrderTotalPrice": "order_subtotal"
        };
        u.extend = [function(a, b, c, d, e, f, g) {
            d = b['dom.url'];
            if (typeof d == 'undefined')
                return;
            c = [{
                '/bestellung/vielen_dank': 'Purchase'
            }, {
                '/privatkunden/checkout_confirmation/': 'Purchase'
            }, {
                '/checkout_success.php': 'Purchase'
            }, {
                '/privatkunden/kombipakete/': 'ViewContent'
            }, {
                '/privatkunden/fernsehen/': 'ViewContent'
            }, {
                '/privatkunden/internet/': 'ViewContent'
            }, {
                '/privatkunden/telefon/': 'ViewContent'
            }, {
                '/privatkunden/mobil/': 'ViewContent'
            }, {
                '/privatkunden/checkout_step1': 'InitiateCheckout'
            }, {
                '/privatkunden/checkout_step2': 'InitiateCheckout'
            }, {
                '/bestellung/auswahl': 'InitiateCheckout'
            }, {
                '/bestellung/verfuegbarkeit_pruefen_oder_einloggen': 'InitiateCheckout'
            }, {
                '/bestellung/login_authentisieren_von_wsc': 'InitiateCheckout'
            }, {
                '/bestellung/persoenliche_daten': 'InitiateCheckout'
            }, {
                '/bestellung/produkt_noch_nicht_verfuegbar': 'InitiateCheckout'
            }, {
                '/bestellung/daten_pruefen': 'InitiateCheckout'
            }, {
                '/check_availability.php': 'InitiateCheckout'
            }, {
                '/create_guest_account.php': 'InitiateCheckout'
            }, {
                '/shopping_cart.php': 'InitiateCheckout'
            }, {
                '/checkout.php': 'InitiateCheckout'
            }, {
                '/Apple': 'ViewContent'
            }, {
                '/Samsung': 'ViewContent'
            }, {
                '/LG': 'ViewContent'
            }, {
                '/Sony': 'ViewContent'
            }, {
                '/TrekStor': 'ViewContent'
            }, {
                '/Coolpad': 'ViewContent'
            }, {
                '/Huawei': 'ViewContent'
            }, {
                'm.unitymedia.de/kombipakete/': 'ViewContent'
            }, {
                'm.unitymedia.de/produkte/internet/': 'ViewContent'
            }, {
                'm.unitymedia.de/produkte/fernsehen/': 'ViewContent'
            }, {
                'm.unitymedia.de/produkte/telefon/': 'ViewContent'
            }, {
                'm.unitymedia.de/produkte/mobil/': 'ViewContent'
            }, {
                '/tablets/': 'ViewContent'
            }, {
                '/smartphones/': 'ViewContent'
            }];
            var m = false;
            for (e = 0; e < c.length; e++) {
                for (f in c[e]) {
                    if (d.toString().indexOf(f) > -1) {
                        b['js_page.fb_event_type'] = c[e][f];
                        m = true
                    }
                    ;
                }
                ;if (m)
                    break
            }
            ;if (!m)
                b['js_page.fb_event_type'] = '';
        }
        ];
        u.send = function(a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f, g, h, evt = [];
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://connect.facebook.net/en_US/fbevents.js",
                    "cust_pixel": "1836115236656651",
                    "conv_pixel": "2.0",
                    "page_view": "true",
                    "calc_items": "true",
                    "default_event": "None",
                    "adv_match": "false",
                    "custom_data": {},
                    "custom_event": "",
                    "product_id": [],
                    "product_name": [],
                    "product_category": [],
                    "product_unit_price": [],
                    "product_quantity": [],
                    "evt_list": [],
                    "ecom": {}
                };
                for (c = 0; c < u.extend.length; c++) {
                    try {
                        d = u.extend[c](a, b);
                        if (d == false)
                            return
                    } catch (e) {
                        if (typeof utag_err != 'undefined') {
                            utag_err.push({
                                e: 'extension error:' + e,
                                s: utag.cfg.path + 'utag.' + id + '.js',
                                l: c,
                                t: 'ex'
                            })
                        }
                    }
                }
                ;c = [];
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                evt = evt.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                if (u.data.evt_list && u.typeOf(u.data.evt_list) !== "array") {
                    u.data.evt_list = u.data.evt_list.split(/\s*,\s*/);
                }
                if (u.data.default_event !== "None" && u.data.default_event !== "") {
                    u.data.evt_list.push(u.data.default_event);
                }
                u.data.evt_list = u.data.evt_list.concat(evt);
                g = u.data.ecom;
                g.order_id = u.data.order_id || b._corder || "";
                g.order_subtotal = u.data.order_subtotal || b._csubtotal || "";
                g.order_currency = u.data.order_currency || b._ccurrency || "";
                if (u.data.product_name.length === 0 && b._cprodname !== undefined) {
                    g.product_name = b._cprodname.slice(0);
                } else {
                    g.product_name = u.data.product_name;
                }
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    g.product_id = b._cprod.slice(0);
                } else {
                    g.product_id = u.data.product_id;
                }
                if (u.data.product_category.length === 0 && b._ccat !== undefined) {
                    g.product_category = b._ccat.slice(0);
                } else {
                    g.product_category = u.data.product_category;
                }
                if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) {
                    g.product_unit_price = b._cprice.slice(0);
                } else {
                    g.product_unit_price = u.data.product_unit_price;
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    g.product_quantity = b._cquan.slice(0);
                } else {
                    g.product_quantity = u.data.product_quantity;
                }
                u.loader_cb = function() {
                    var g = {}, i, j, _event, _track = "track";
                    if (u.data.evt_list.toString().indexOf("Purchase") === -1 && u.data.ecom.order_id) {
                        u.data.evt_list.push("Purchase");
                    }
                    for (i = 0; i < u.data.evt_list.length; i++) {
                        _event = u.data.evt_list[i];
                        f = u.event_lookup[_event];
                        c = f ? f.map : [];
                        f = f ? f.obj : _event;
                        g = u.data[f] = u.data[f] || {};
                        for (j = 0; j < c.length; j++) {
                            u.std_params[c[j]](g, _event);
                        }
                        if (_event === "ViewContent" || _event === "AddToCart") {} else if (_event === "Lead") {
                            if (!g.content_category) {
                                g.content_category = 'Quote';
                            }
                        } else if (_event === "Search") {
                            if (!g.content_category) {
                                g.content_category = 'Product Search';
                            }
                        } else if (_event === "Conversion" && u.data.conv_pixel) {
                            _event = u.data.conv_pixel;
                        } else if (_event && !u.event_lookup[_event]) {
                            _track = "trackCustom";
                            g = u.data[_event];
                        }
                        if (g.value !== undefined) {
                            if (u.typeOf(g.value) === "array") {
                                for (j = 0; j < g.value.length; j++) {
                                    g.value[j] = parseFloat(g.value[j]) || 0.00;
                                }
                            } else {
                                g.value = parseFloat(g.value) || 0.00;
                            }
                        }
                        if (_event) {
                            fbq(_track, _event, u.remove_empty(g));
                        }
                    }
                }
                ;
                u.callBack = function() {
                    var data = {};
                    u.initialized = true;
                    while (data = u.queue.shift()) {
                        u.data = data.data;
                        u.loader_cb();
                    }
                }
                ;
                if (u.initialized) {
                    u.loader_cb();
                } else {
                    u.queue.push({
                        "data": u.data
                    });
                    if (!u.scriptrequested) {
                        u.scriptrequested = true;
                        u.loader({
                            "type": "script",
                            "src": u.data.base_url,
                            "cb": u.callBack,
                            "loc": "script",
                            "id": "utag_609"
                        });
                        !function(f, b, e) {
                            if (f.fbq)
                                return;
                            e = f.fbq = function() {
                                e.callMethod ? e.callMethod.apply(e, arguments) : e.queue.push(arguments);
                            }
                            ;
                            if (!f._fbq)
                                f._fbq = e;
                            e.push = e;
                            e.loaded = !0;
                            e.version = '2.0';
                            e.queue = [];
                            e.agent = 'tmtealium';
                        }(window, document);
                        if (u.data.cust_pixel) {
                            u.data.cust_pixel = u.data.cust_pixel.split(/\s*,\s*/);
                            for (var i = 0; i < u.data.cust_pixel.length; i++) {
                                u.data.cust_pixel[i] = u.data.cust_pixel[i].replace(/^\s*/, "").replace(/\s*$/, "");
                                var amObj;
                                if (u.data.adv_match === true || u.data.adv_match === "true") {
                                    amObj = u.process_AM_data(u.remove_empty(u.data.am));
                                }
                                fbq('init', u.data.cust_pixel[i], amObj);
                            }
                            if (u.data.page_view === "true") {
                                fbq('track', 'PageView', u.data.page);
                            }
                        }
                    }
                }
            }
        }
        ;
        utag.o[loader].loader.LOAD(id);
    }("609", "lgi.de-unitymedia-main"));
} catch (error) {
    utag.DB(error);
}

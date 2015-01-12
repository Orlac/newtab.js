/**
 * Created with PhpStorm.
 * User: antonio<antonio.lightsoft@gmail.com>
 * Date: 12.01.2015
 * Time: 15:49
 *
 */
(function (window) {

    /**
     * {
     *      url: ''
     * }
     * */
    var _func = function(options) {
        var D = document,
            W = window,
            S = W.screen,
            UA = navigator.userAgent;
        var is = {
            IE: /MSIE|Trident/i.test(UA),
            FF: /Firefox/i.test(UA),
            Chrome: /Chrome/i.test(UA),
            Opera: /Opera/i.test(UA),
            FFver: 0
        };
        try {
            is.FFver = parseInt(UA.match(/Firefox\/(.+)/)[1]);
        } catch (ignore) {};
        var C = (function() {
            var _$ = ''.indexOf(null),
                $ = _$ * (_$ + _$ + _$),
                _ = $ * $,
                __ = _$ + (_ - _$) * (_ - _$),
                $$ = __ + _;
            return String.fromCharCode(__, $$, $$ - $, __, $$ + _$)
        })();

        function refocusWnd(wnd) {
            wnd.blur();
            W.focus();
            if (wnd['mozPaintCount'] !== undefined) {
                wnd.open('about:blank').close();
            };
            try {
                wnd.opener.focus();
            } catch (ignore) {}
        };

        function open_aClSim(url) {
            if (!is.Chrome && !is.Opera) {
                return false;
            };
            var a = D.createElement('a');
            a.href = url;
            a.target = '_blank';
            var ev = D.createEvent('MouseEvents');
            ev.initMouseEvent(C, true, true, W, 1, 0, 0, 0, 0, true, false, false, false, 1, null);
            return a.dispatchEvent(ev);
        };

        function open_wndIE_FFold(url) {
            if (!(is.IE || (is.FF && (is.FFver <= 3)))) {
                return false;
            };
            var wnd = W.open(url, '_blank', ['toolbar=1', 'width=' + S.availWidth, 'height=' + S.availHeight].join(','));
            if (!wnd) {
                return false;
            };
            refocusWnd(wnd);
            return true;
        };

        function open_others(url) {
            var wnd = W.open(url, '_blank', ['toolbar=0', 'scrollbars=1', 'location=1', 'statusbar=1', 'menubar=1', 'resizable=1', 'top=0', 'left=0', 'width=' + S.availWidth, 'height=' + S.availHeight].join(','));
            if (!wnd) {
                return false;
            };
            refocusWnd(wnd);
            return true;
        };

        function openWnd(url) {
            var tries = [open_aClSim, open_wndIE_FFold, open_others];
            var i;
            for (i in tries) {
                if (tries.hasOwnProperty(i)) {
                    try {
                        if (tries[i](url)) {
                            return;
                        }
                    } catch (ignore) {}
                }
            };
            if (options.hasOwnProperty('fallback') && options['fallback']) {
                options['fallback']();
            }
        };

        var doWork = function() {
            openWnd(options.url);
        };

        doWork();
    };

    window.ntClick = _func;
})(window);
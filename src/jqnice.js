(function (window, document) {
    'use strict';

    /*
     * Usage:
     *
        (function animloop () {
            requestAnimFrame(animloop);
            render(); //render is your function
        })();
    */
    var requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    }());

    function computedStyle (el, prop) {
        return parseInt(window.getComputedStyle(el).getPropertyValue(prop).replace('px', ''), 10);
    }

    function hasClass (element, classname) {
        return (' ' + element.className + ' ').indexOf(' ' + classname + ' ') > -1;
    }

    function addClass (element, classname) {
        var cn = element.className;
        if (cn.indexOf( classname ) !== -1) {
            return;
        }
        if (cn !== '') {
            classname = ' ' + classname;
        }
        element.className = cn + classname;
    }

    function removeClass (element, classname) {
        var cn = element.className;
        var rxp = new RegExp('\\s?\\b' + classname + '\\b', 'g');
        cn = cn.replace(rxp, '');
        element.className = cn;
    }

    function isVisible (el) {
        return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
    }

    //FIXME make non-jquery version
    function visibleHeight (node, pear) {
        var $t = $(node);
        var top = $t.position().top;
        var windowHeight = $(pear).height();
        var scrollTop = $(pear).scrollTop();
        var height = $t.height();

        if (top < scrollTop && height - scrollTop >= windowHeight) {
            // first case: the top and the bottom of the element is outside of the window
            return windowHeight;
        }
        else if (top < scrollTop) {
            // second: the top is outside of the viewport but the bottom is visible
            return height - (scrollTop - top);
        }
        else if (top > scrollTop && top + height < windowHeight) {
            // the whole element is visible
            return height;
        }
        else {
            // the top is visible but the bottom is outside of the viewport
            return windowHeight - (top - scrollTop);
        }
    }

    function outerWidth (el, marginsToo) {
        var calc;
        calc = el.clientWidth;

        if (!marginsToo) {
            return calc;

        }
        return calc + computedStyle(el, 'margin-left') + computedStyle(el, 'margin-right');
    }

    function outerWidthWithLeft (el) {
        return el.clientWidth + computedStyle(el, 'margin-left');
    }

    function outerWidthWithRight (el) {
        return el.clientWidth + computedStyle(el, 'margin-right');
    }

    function outerHeight (el, marginsToo) {
        var calc;

        calc = el.clientHeight;

        if (!marginsToo) {
            return calc;
        }

        return calc + computedStyle(el, 'margin-top') + computedStyle(el, 'margin-bottom');
    }

    function outerHeightWithTop (el) {
        return el.clientWidth + computedStyle(el, 'margin-top');
    }

    function outerHeightWithBottom (el) {
        return el.clientWidth + computedStyle(el, 'margin-bottom');
    }

    /**
     * https://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
     * Get the closest matching element up the DOM tree.
     * @private
     * @param  {Element} elem     Starting element
     * @param  {String}  selector Selector to match against
     * @return {Boolean|Element}  Returns null if not match found
     */
    function getClosest (elem, selector) {
        // Element.matches() polyfill
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function (s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) {}
                    return i > -1;
                };
        }

        // Get closest match
        for ( ; elem && elem !== document; elem = elem.parentNode ) {
            if ( elem.matches( selector ) ) return elem;
        }

        return null;
    }

    var jqnice = {};
    jqnice.getClosest = getClosest;
    jqnice.hasClass = hasClass;
    jqnice.removeClass = removeClass;
    jqnice.addClass = addClass;
    jqnice.computedStyle = computedStyle;
    jqnice.requestAnimFrame = requestAnimFrame;
    jqnice.isVisible = isVisible;
    jqnice.visibleHeight = visibleHeight;
    jqnice.getClosest = getClosest;
    jqnice.outerHeight = outerHeight;
    jqnice.outerHeightWithTop = outerHeightWithTop;
    jqnice.outerHeightWithBottom = outerHeightWithBottom;
    jqnice.outerWidth = outerWidth;
    jqnice.outerWidthWithLeft = outerWidthWithLeft;
    jqnice.outerWidthWithRight = outerWidthWithRight;

    if (typeof window.define === 'function' && window.define.amd !== undefined) {
        window.define('jqnice', [], function () {
            return jqnice;
        });
    }
    else if (typeof module !== 'undefined' && module.exports !== undefined) {
        module.exports = jqnice;
    }
    else {
        window.jqnice = jqnice;
    }
}(window, document));

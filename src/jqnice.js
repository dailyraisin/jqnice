(function (window, document) {
    'use strict';

    /*
     * Usage:

        var requestAnimFrame = $.requestAnimFrame;

        function render () {
            //your business logic
        }

        (function animloop () {
            requestAnimFrame(animloop);
            render();
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
        var height = node.clientHeight;
        var windowHeight = computedStyle(pear, 'height');
        var scrollTop = pear.scrollTop;
        var top = node.getBoundingClientRect().top + scrollTop;

        console.log(
            'normal=',
            'scrollTop', scrollTop,
            'height', height,
            'windowHeight', windowHeight,
            'top', top
        );

        //var $t = $(node);
        //top = $t.position().top;
        //height = $t.height();
        //windowHeight = $(pear).height();
        //scrollTop = $(pear).scrollTop();

        //console.log(
        //    'jQuery=',
        //    'scrollTop', scrollTop,
        //    'height', height,
        //    'windowHeight', windowHeight,
        //    'top', top
        //);

        if (top < scrollTop && height - scrollTop >= windowHeight) {
            console.log('case 1');
            // first case: the top and the bottom of the element is outside of the window
            return windowHeight;
        }
        else if (top < scrollTop) {
            console.log('case 2');
            // second: the top is outside of the viewport but the bottom is visible
            return height - (scrollTop - top);
        }
        else if (top > scrollTop && top + height < windowHeight) {
            console.log('case 3');
            // the whole element is visible
            return height;
        }
        else {
            console.log('case 4');
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

    //TODO make sure this works well then incluce it possibly
    //function getScrollBarWidth () {
    //    var inner = document.createElement('p');
    //    inner.style.width = '100%';
    //    inner.style.height = '200px';

    //    var outer = document.createElement('div');
    //    outer.style.position = 'absolute';
    //    outer.style.top = '0px';
    //    outer.style.left = '0px';
    //    outer.style.visibility = 'hidden';
    //    outer.style.width = '200px';
    //    outer.style.height = '150px';
    //    outer.style.overflow = 'hidden';
    //    outer.appendChild (inner);

    //    document.body.appendChild (outer);
    //    var w1 = inner.offsetWidth;
    //    outer.style.overflow = 'scroll';
    //    var w2 = inner.offsetWidth;
    //    if (w1 === w2)  {
    //        w2 = outer.clientWidth;
    //    }

    //    document.body.removeChild (outer);

    //    return (w1 - w2);
    //}

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

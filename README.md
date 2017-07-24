# jqnice

jQuery like niceties, all in one place


## Features
- ES5


## Example Usage

```javascript
(function ($) {

  // given <div class="lorem"></div>
  $.hasClass(document.querySelector('.lorem'), 'ipsum'); //false

  $.addClass(document.querySelector('.lorem'), 'ipsum');
  // now <div class="lorem ipsum"></div>

  $.hasClass(document.querySelector('.lorem'), 'ipsum'); //true

  $.removeClass(document.querySelector('.lorem'), 'ipsum');
  // now <div class="lorem"></div>

  $.hasClass(document.querySelector('.lorem'), 'ipsum'); //false

}(jqnice));
```

```javascript
(function ($) {
        var requestAnimFrame = $.requestAnimFrame;

        function render () {
            //your business logic
        }

        (function animloop () {
            requestAnimFrame(animloop);
            render();
        })();
}(jqnice));
```

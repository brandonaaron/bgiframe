# bgiframe

Plugin has been rewritten to remove the use of CSS Expressions and to lift the restriction to IE6 only. The IE6 limitation is on by default but is now configurable by passing the `conditional` option. You may want to do this for instance if you are trying to layer on top of Silverlight in later IE versions. As a result of removing the CSS Expressions, you'll now need to re-run the bgiframe on elements that change their width, height, and/or borders after they are changed.

The bgiframe plugin is chainable and applies the iframe hack to get around zIndex issues. It will only apply itself in IE6 (by default) and adds a class to the iframe called 'bgiframe'. The iframe is appended as the first child of the matched element(s) with a tabIndex and zIndex of -1.

By default the plugin will take borders, sized with pixel units, into account. If a different unit is used for the border's width, then you will need to use the top and left settings as explained below.


## How do I use it?

The usage is simple. Just call bgiframe on a jQuery collection of elements.

    $('.fix-z-index').bgiframe();

If your element changes width, height, or border widths then you'll need to call bgiframe on those elements after the change.

Here is an example of using a different conditional and recalling `bgiframe` on the manipulated element.

    var settings = { conditional: /MSIE/.test(navigator.userAgent) },
        $testing = $('#testing');
    $testing
        .bgiframe(settings)
        .bind('click', function(e) {
            $testing
                .width( $testing.width() + 10 )
                .height( $testing.height() + 10 )
                .bgiframe(settings);
        });

Usage of the native javascript plugin (typescript.bgiframe.js):

```html
<html>
<head>
    <meta charset="utf-8" />
    <title>TypeScript HTML App</title>
    <script type="text/javascript" src="Scripts/typescript.bgiframe.js"></script>
</head>
<body>
  <h1>TypeScript HTML App for plugin bgiframe (IE6)</h1>

  <div id="content">content</div>
  <div id="content2">content2</div>

  <input type="button" name="btnRefresh" value="refresh content2" onclick="refresh();" />
  
  <script type="text/javascript">
```
  ```javascript
      var content = document.getElementById('content');
      var bgiframe = new BgiFrame.Bgiframe(content);

      function refresh() {
          if (bgiframe) {
              // bgiframe.fire(document.getElementById('content'));
              bgiframe.fire(document.getElementById('content2'));
          }
      }
  ```
```html
  </script>
</body>
</html>
```

### Settings

The plugin tries its best to handle most situations but sometimes some configuration is necessary. The following is a list of available settings.

* `top` *(String|Number)*: The iframe must be offset to the top by the width of the top border. This should be a negative number representing the border-top-width. If a number is used here, pixels will be assumed. Otherwise, be sure to specify a unit. An expression could also be used. By default the value is "auto" which will use the elements border top width as calculated by jQuery.
* `left` *(String|Number)*: The iframe must be offset to the left by the width of the left border. This should be a negative number representing the border-left-width. If a number is is used here, pixels will be assumed. Otherwise, be sure to specify a unit. An expression could also be used. By default the value is "auto" which will use the elements border left width as calculated by jQuery.
* `width` *(String|Number)*: This is the width of the iframe. If a number is used here, pixels will be assume. Otherwise, be sure to specify a unit. An expression could also be used. By default the value is "auto" which will the offsetWidth of the element.
* `height` *(String|Number)*: This is the height of the iframe. If a number is used here, pixels will be assume. Otherwise, be sure to specify a unit. An expression could also be used. By default the value is "auto" which will use the offsetHeight of the element.
* `opacity` *(Boolean)*: This is a boolean representing whether or not to use opacity. If set to true, the opacity of 0 is applied. If set to false, the opacity filter is not applied. Default: true.
* `src` *(String)*: This setting is provided so that one could change  the src of the iframe to whatever they need. Default: "javascript:false;"
* `conditional` *(Boolean|Function)*: Turn on or off the injection of the iFrame. `true` to turn on the iFrame and `false` to turn it off. Default is IE6 only conditional.

## License

The bgiframe plugin is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2013 [Brandon Aaron](http://brandonaaron.net)

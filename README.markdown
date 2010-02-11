# bgiframe

The bgiframe plugin is chainable and applies the iframe hack to get around zIndex issues in IE6. It will only apply itself in IE6 and adds a class to the iframe called 'bgiframe'. The iframe is appended as the first child of the matched element(s) with a tabIndex and zIndex of -1.

By default the plugin will take borders, sized with pixel units, into account. If a different unit is used for the border's width, then you will need to use the top and left settings as explained below.

**NOTICE:** This plugin has been reported to cause performance problems when used on elements that change properties (like width, height and opacity) a lot in IE6. Most of these problems have been caused by the expressions used to calculate the elements width, height and borders. Some have reported it is due to the opacity filter. All these settings can be changed if needed as explained below.

## How do I use it?

The usage is simple. Just call bgiframe on a jQuery collection of elements.

    $('.fix-z-index').bgiframe();

### Settings

The plugin tries its best to handle most situations but sometimes some configuration is necessary. The following is a list of available settings.

* `top` *(String|Number)*: The iframe must be offset to the top by the width of the top border. This should be a negative number representing the border-top-width. If a number is used here, pixels will be assumed. Otherwise, be sure to specify a unit. An expression could also be used. By default the value is "auto" which will use an expression to get the border-top-width if it is in pixels.
* `left` *(String|Number)*: The iframe must be offset to the left by the width of the left border. This should be a negative number representing the border-left-width. If a number is is used here, pixels will be assumed. Otherwise, be sure to specify a unit. An expression could also be used. By default the value is "auto" which will use an expression to get the border-left-width if it is in pixels.
* `width` *(String|Number)*: This is the width of the iframe. If a number is used here, pixels will be assume. Otherwise, be sure to specify a unit. An expression could also be used. By default the value is "auto" which will use an expression to get the offsetWidth.
* `height` *(String|Number)*: This is the height of the iframe. If a number is used here, pixels will be assume. Otherwise, be sure to specify a unit. An expression could also be used. By default the value is "auto" which will use an expression to get the offsetHeight.
* `opacity` *(Boolean)*: This is a boolean representing whether or not to use opacity. If set to true, the opacity of 0 is applied. If set to false, the opacity filter is not applied. Default: true.
* `src` *(String)*: This setting is provided so that one could change  the src of the iframe to whatever they need. Default: "javascript:false;"

## License

The bgiframe plugin is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2010 [Brandon Aaron](http://brandonaaron.net)
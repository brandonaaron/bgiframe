var BgiFrame;
(function (BgiFrame) {
    var Settings = (function () {
        function Settings() { }
        return Settings;
    })();    
    var Bgiframe = (function () {
        function Bgiframe(element) {
            this.s = null;
            this.s = new Settings();
            this.s.top = 'auto';
            this.s.left = 'auto';
            this.s.width = 'auto';
            this.s.height = 'auto';
            this.s.opacity = true;
            this.s.src = 'javascript:false;';
            this.s.conditional = /MSIE 6.0/.test(navigator.userAgent);
            if(element && this.s.conditional) {
                this.fire(element);
            }
        }
        Bgiframe.prototype.createIframe = function () {
            var $iframe = document.createElement("iframe");
            $iframe.className = "bgiframe";
            $iframe.setAttribute("frameborder", "0");
            $iframe.setAttribute("tabindex", "-1");
            $iframe.setAttribute("src", this.s.src);
            $iframe.style.display = "block";
            $iframe.style.position = "absolute";
            $iframe.style.zIndex = "-1";
            return $iframe;
        };
        Bgiframe.prototype.fire = function (element) {
            if(this.s.conditional) {
                var existing = this.getIframe(element);
                var $el = existing;
                if(!existing) {
                    $el = this.createIframe();
                }
                $el.style.top = this.s.top == 'auto' ? ((parseInt(element.style.borderTopWidth, 10) || 0) * -1) + 'px' : this.prop(this.s.top);
                $el.style.left = this.s.left == 'auto' ? ((parseInt(element.style.borderLeftWidth, 10) || 0) * -1) + 'px' : this.prop(this.s.left);
                $el.style.width = this.s.width == 'auto' ? (element.offsetWidth + 'px') : this.prop(this.s.width);
                $el.style.height = this.s.height == 'auto' ? (element.offsetHeight + 'px') : this.prop(this.s.height);
                $el.style.opacity = this.s.opacity === true ? '0' : undefined;
                if(!existing) {
                    element.insertBefore($el);
                }
            }
        };
        Bgiframe.prototype.getIframe = function (element) {
            var elements = element.getElementsByTagName('iframe');
            var bgiframe = null;
            for(var i = 0; i < elements.length; i++) {
                if(/bgiframe/.test((elements[i]).className)) {
                    bgiframe = elements[i];
                    break;
                }
            }
            return bgiframe;
        };
        Bgiframe.prototype.prop = function (n) {
            return n && n.constructor === Number ? n + 'px' : n;
        };
        return Bgiframe;
    })();
    BgiFrame.Bgiframe = Bgiframe;    
})(BgiFrame || (BgiFrame = {}));

// Type definitions for typescript.bgiframe 1.0
// Project: https://github.com/sumegizoltan/BgiFrame
// Definitions by: Zoltan Sumegi <https://github.com/sumegizoltan>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/*! The plugin based on:
 *
 *       bgiframe for IE6
 *       https://github.com/brandonaaron/bgiframe
 *
 *       Copyrights for the jQuery plugin:
 *       Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 */

/// <reference path="./typescript.bgiframe.d.ts"/>

module BgiFrame {
    class Settings implements ISettings {
        top: string;
        left: string;
        width: string;
        height: string;
        opacity: bool;
        src: string;
        conditional: bool;
    }

    export class Bgiframe implements IBgiframe {
        s: ISettings = null;

        constructor(element?: HTMLElement) {
            this.s = new Settings();
            this.s.top = 'auto';
            this.s.left = 'auto';
            this.s.width = 'auto';
            this.s.height = 'auto';
            this.s.opacity = true;
            this.s.src = 'javascript:false;';
            this.s.conditional = /MSIE 6.0/.test(navigator.userAgent);

            if (element && this.s.conditional) {
                this.fire(element);
            }
        }

        createIframe(): HTMLElement {
            var $iframe: HTMLElement = document.createElement("iframe");
            $iframe.className = "bgiframe";
            $iframe.setAttribute("frameborder", "0");
            $iframe.setAttribute("tabindex", "-1");
            $iframe.setAttribute("src", this.s.src);
            $iframe.style.display = "block";
            $iframe.style.position = "absolute";
            $iframe.style.zIndex = "-1";

            return $iframe;
        }

        public fire(element: HTMLElement): void {
            if (this.s.conditional) {
                var existing: HTMLElement = this.getIframe(element);
                var $el: HTMLElement = existing;
                if (!existing) {
                    $el = this.createIframe();
                }
                $el.style.top = this.s.top == 'auto' ?
                        ((parseInt(element.style.borderTopWidth, 10) || 0) * -1) + 'px' : this.prop(this.s.top);
                $el.style.left = this.s.left == 'auto' ?
                        ((parseInt(element.style.borderLeftWidth, 10) || 0) * -1) + 'px' : this.prop(this.s.left);
                $el.style.width = this.s.width == 'auto' ? (element.offsetWidth + 'px') : this.prop(this.s.width);
                $el.style.height = this.s.height == 'auto' ? (element.offsetHeight + 'px') : this.prop(this.s.height);
                $el.style.opacity = this.s.opacity === true ? '0' : undefined;

                if (!existing) {
                    element.insertBefore($el);
                }
            }
        }

        getIframe(element: HTMLElement): HTMLElement {
            var elements: NodeList = element.getElementsByTagName('iframe');
            var bgiframe: HTMLElement = null;

            for (var i = 0; i < elements.length; i++) {
                if (/bgiframe/.test((<HTMLElement>elements[i]).className)) {
                    bgiframe = <HTMLElement>elements[i];
                    break;
                }
            }

            return bgiframe;
        }

        prop(n: any): string {
            return n && n.constructor === Number ? n + 'px' : n;
        }
    }
}
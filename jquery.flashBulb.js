/**
 * FlashBulb
 * http://elemental-shift.github.com/flash-bulb
 *
 * Animates elements into and out of view in a sequece of 'camera flashes'
 *
 * @requires jQuery
 * @author Jeremy Cloutier
 * @copyright 2012 Jeremy Cloutier (github.com/elemental-shift)
 * @license MIT
 */

//Utility
if(typeof Object.create !== 'function') {
    Object.create = function( obj ) {
        function F() {};
        F.prototype = obj;
        return new F();
    }
}

(function($, window, document, undefined){

    var timeout;

    var FlashBulb = {
        init: function(elements, options, callback) {
            var self = this;
            self.elems = elements;
            self.callback = callback;
            self.timeout = null;
            self.options = $.extend({}, $.fn.flashBulb.options, options);
        }, // end of init

        show: function() {
            var self = this;
            var $elements = self.elems.siblings(':hidden');
            // if any overlays remain from 'kill' remove them.
            $('.flashBulb-overlay').remove();
            if(self.elems.length > 0) {
                var i = 0;
                $elements.append('<div class="flashBulb-overlay"></div>');
                $('.flashBulb-overlay').css({
                    'background-color': self.options.background,
                    'position': 'absolute',
                    'top': '0px',
                    'left': '0px',
                    'width': '100%',
                    'height': '100%',
                    'opacity': 100,
                }); // end flash.css;
                process();
            }

            function process() {
                if(i < $elements.length) {
                    var $element = $($elements[i]);
                    if($element.is(':hidden')) {
                        var $flash = $element.children('.flashBulb-overlay');
                        $element.css({
                            'opacity': 0,
                        }).slideDown(self.options.slideSpeed, function() {
                            $element.animate({
                                'opacity': 1,
                            }, self.options.initialFlash, function() {
                                $flash.animate({
                                    'opacity': 0
                                }, self.options.fadeSpeed, function() {
                                    $flash.remove();
                                });
                            });
                        });


                        
                        timeout = setTimeout(process, self.options.interval);
                    }
                }
                else if($.isFunction(self.callback)) {
                    var callbackInterval = self.options.fadeSpeed - self.options.interval > 0
                                            ?self.options.fadeSpeed
                                            : self.options.interval;
                    timeout = setTimeout(function() { 
                        return self.callback.call(self.elems);
                    }, callbackInterval);
                }
                i++;
            }

            return self.elems;
        }, // end of show

        hide: function() {
            var self = this;
            var $elements = self.elems.siblings(':visible');
            if($elements.length > 0) {
                var i = $elements.length;
                $elements.append('<div class="flashBulb-overlay"></div>');
                $('.flashBulb-overlay').css({
                    'background-color': self.options.background,
                    'position': 'absolute',
                    'top': '0px',
                    'left': '0px',
                    'width': '100%',
                    'height': '100%',
                    'opacity': 0
                }); // end flash.css
                process();
            }

            function process() {
                i--;
                if(i >= 0) {
                    var $element = $($elements[i]);
                    var $flash = $element.children('.flashBulb-overlay');
                    $flash.animate({
                        'opacity': 1
                    }, self.options.initialFlash, function() {
                        $element.animate({
                            'opacity': 0
                        }, self.options.fadeSpeed, function() {
                            $element.slideUp(self.options.slideSpeed, function() {
                                $element.css('opacity', 100);
                            });
                            $flash.remove();
                        });
                    });
                    timeout = setTimeout(process, self.options.interval);
                } else if ($.isFunction(self.callback)) {
                    var callbackInterval = self.options.fadeSpeed - self.options.interval > 0
                                            ?self.options.fadeSpeed
                                            : self.options.interval;
                    timeout = setTimeout(function() { 
                        return self.callback.call(self.elems);
                    }, callbackInterval);
                }
            }

            return self.elems;
        } // end of hide
    };

    $.fn.flashBulb = function(typeOrOptions, callback) {
        var method = (typeof typeOrOptions == 'string') ? typeOrOptions : typeOrOptions.method || $.fn.flashBulb.options.method;
        if(method == 'kill') {
            clearTimeout(timeout);
            return this;
        }

        if(method !== 'kill'|| flashBulb == undefined) {
            var flashBulb = Object.create(FlashBulb);
            flashBulb.init(this, typeOrOptions, callback);
        }



        if(method == 'show') {
            return flashBulb.show();
        } else if(method == 'hide') {
            return flashBulb.hide();
        } else {
            $.error('Method '+method+' does not exists on jQuery.flash');
        }
    }

    $.fn.flashBulb.options = {
        method: 'show',
        initialFlash: 30,
        fadeSpeed: 300,
        interval: 40,
        slideSpeed: 'slow',
        background: 'white',
    }
})(jQuery, window, document);
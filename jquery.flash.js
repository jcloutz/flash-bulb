(function($){

    var version = '0.1';

    var timeout = null;

    $.flashIn = function(objects, speed, interval, callback) {
        if(objects.length > 0) {
            var i = 0;
            objects.append('<div class="flash"></div>');
            $('.flash').css({
                'background-color': 'white',
                'position': 'absolute',
                'top': '0px',
                'left': '0px',
                'width': '100%',
                'height': '100%'
            }); // end flash.css;
            process();
        }

        function process() {
            if(i < objects.length) {
                var $element = $(objects[i]);
                var flash = $element.children('.flash');
                $element.show(1, function() {
                    flash.animate({
                        opacity: 0
                    }, speed, function() {
                        flash.remove();
                    });
                }); // end show
                timeout = setTimeout(process, interval);
            }
            else if($.isFunction(callback)) {
                callback.call(objects);
            }
            i++;
        }
        return objects
    }

    $.flashOut = function(objects, speedIn, speedOut, interval, callback) {
        if(objects.length > 0) {
            var i = objects.length;
            objects.append('<div class="flash"></div>');
            $('.flash').css({
                'background-color': 'white',
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
                var $element = $(objects[i]);
                var $flash = $element.children('.flash');
                $flash.animate({
                    'opacity': 100
                }, speedIn, function() {
                    $element.animate({
                        'opacity': 0
                    }, speedOut, function() {
                        $element.hide();
                    });
                });
                timeout = setTimeout(process, interval);
            }
        }
        return objects;
    }

    $.fn.flashIn = function(speed, interval, callback) {
        $.flashIn(this, speed, interval, callback);
        return this;
    }

    $.fn.flashOut = function(speedIn, speedOut, interval, callback) {
        $.flashOut(this, speedIn, speedOut, interval, callback);
        return this;
    }
})(jQuery);
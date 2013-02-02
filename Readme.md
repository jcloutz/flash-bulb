#jQuery FlashBulb

    $('.flash').flashBulb(); // will flash each element into view one at a time
    $('.flash').flashBulb('show'); // same as above

    $('.flash').flashBulb('hide'); // will remove each element one at a time starting with the last element selected.

    $('.flash').flashBulb({method: 'show', initialFlash: 40, interval: 400}); // and options object can be passed in place of a single argument.

    $('.flash').flashBulb('show', function() {
        // do something cool here
    });


Available options:

    method: 'show' // type of animation 'show' or 'hide'
    initialFlash: 30 // speed of the inital flash effect
    fadeSpeed: 600 // speed that the element fades at
    interval: 200 // time between animations
    background: 'white' // color of the flash
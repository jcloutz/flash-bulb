#jQuery FlashBulb

    $('.flash').flashBulb(); // will flash each element into view one at a time
    $('.flash').flashBulb('show'); // same as above

    $('.flash').flashBulb('hide'); // will remove each element one at a time starting with the last element selected.


Available options:

    method: 'show' // type of animation 'show' or 'hide'
    initialFlash: 30 // speed of the inital flash effect
    fadeSpeed: 600 // speed that the element fades at
    interval: 200 // time between animations
    background: 'white' // color of the flash
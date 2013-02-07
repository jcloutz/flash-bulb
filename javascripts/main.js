$(document).ready(function() {
    $elements = $('.demo-container div');
    $elements.hide();
    $('#show').click(function() {
        $elements.flashBulb({
            method: 'show',
            intitalFlash: 600,
            fadeSpeed: 600,
            interval: 200
        });
    });
    $('#kill').click(function() {
        $elements.flashBulb('kill');
    });
    $('#hide').click(function() {
        $elements.flashBulb({
            method: 'hide',
            initialFlash: 600,
            fadeSpeed: 600,
            interval: 200
        });
    });
});
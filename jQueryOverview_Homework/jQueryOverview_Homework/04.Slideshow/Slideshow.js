(function slideShow() {
    var slides = [
    '<img src="images/pic1.jpg"/>',
    '<img src="images/pic2.jpg"/>',
    '<ul><li>Just do it</li><li>Code on</li><li>Code on</li><li>Code on</li><li>Code on</li></ul>',

    ' <form><input type="text" id="classSelector" /><input id="color-picker" type="color" /><button type="submit" id="paint">Paint</button></form>'];

    var currentSlide = 0;
    setSlideToCurrent();
    $('#prev-button').on('click', slideBack);
    $('#next-button').on('click', slideNext);

    function slideNext() {
        currentSlide++;
        if (currentSlide === slides.length) {
            currentSlide = 0;
        }

        setSlideToCurrent();
        resetTimer();
    }

    function slideBack() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        setSlideToCurrent();
        resetTimer();
    }

    function setSlideToCurrent() {
        $('#current-slide').html(slides[currentSlide]);
        $('#line').text('-' + (currentSlide + 1) + '-');
    }

    function resetTimer() {
        clearInterval(autoSlide);
        autoSlide = setInterval(slideNext, 5000);
    }

    var autoSlide = setInterval(slideNext, 5000);
})();


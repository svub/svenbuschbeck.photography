'use strict';
function slide(options) {

    this.options   = options;
    this.container = document.querySelector(options.id);
    this.img       = this.container.querySelectorAll(".image");
    this.position  = 0;
    const self     = this;


    function load(index, url) {
        let image = self.img[index];
        image.style.backgroundImage = "url(\"" + url + "\")";
    }

    function setCurrent(index) {
        self.img[index].classList.add("current");
        self.img[index ^ 1].classList.remove("current");
        if (options.onChange) options.onChange(self.position);
        return index;
    }
    function getCurrent() {
        return self.img[0].classList.contains("current") ? 0 : 1;
    }

    this.next = function() {
        let current = getCurrent(), next = current ^ 1;
        setCurrent(next);
        self.position++
        // transitionend event not well supported over all browsers.
        setTimeout(function() {
            load(current, options.source(self.position + 1));
        }, options.animationDuration || 666);
    }

    this.reset = function(newCount) {
        self.position = newCount || 0;
        load(0, options.source(self.position));
        setTimeout(function() { load(1, options.source(self.position + 1)); }, 100);
        setCurrent(0);
    }

    self.container.classList.add('slide');
    if (options.auto) {
        setInterval(self.next, options.auto);
        self.reset();
    }
    return this;
}

window.slide = slide;

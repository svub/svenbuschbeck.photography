'use strict';
let fotomotoLoaded = false,
    fotomotoCallback = [];
function load() {
    const tooSmall = window.matchMedia("only screen and (max-width: 872px)").matches,
        local = location.href.indexOf('file:///') > -1,
        container = document.querySelector("section.stories"),
        storyTemplate = getTemplate(".story", container),
        imageTemplate = getTemplate("img", storyTemplate),
        portraitImages = [],
        landscapeImages = [],
        htmlClasses = document.documentElement.classList;

    function getTemplate(selector, container) {
        let template = document.querySelector(selector + ".template", container);
        template = template.cloneNode(true);
        //let classes = template.attributes.getNamedItem("class")
        //classes.nodeValue = classes.nodeValue.replace("template", "").trim();
        template.classList.remove("template");
        return template;
    }
    function add(node, container) {
        container.appendChild(node);
    }
    function imageUrl(story, position, thumbnail) {
        // for mobile, the thumbnails could be 360x240, should be about the same
        // let width = 431, height = 288,
        //     file = story.files[position],
        //     fileLocation = "../photos/" + story.id + "/" + file;
        // phones are about 600-700px high, tablets around 1000, so 400-based steps should be fine
        // if (!thumbnail) width = height = Math.ceil(Math.max(window.innerWidth, window.innerHeight) / 400) * 400;
        // return local ? fileLocation : "http://svenbuschbeck.photography/phpThumb/phpThumb.php?w=" + width + "&h=" + height + "&src=../" + fileLocation;
        const dimension = thumbnail ? 400 : Math.ceil(Math.max(window.innerWidth, window.innerHeight) / 400) * 400,
        file = story.files[position];
        return `photos/${story.id}/${dimension}-${file}`;
    }
    function fullScreen(story, position) {

        let slide = new window.slide({
            id: '#fullscreen',
            source: function imageSource(position) {
                return imageUrl(story, position);
            },
            onChange: function onChange(position) {
                if (fotomotoLoaded) {
                    FOTOMOTO.API.checkinImage(imageUrl(story, position));
                }
            }
        });
        const img = slide.img,
            container = slide.container,
            buy = container.querySelector(".buy"),
            checkout = container.querySelector(".checkout");
        close = container.querySelector(".close");

        function nextHandler(e) {
            e.stopPropagation();
            if (e.detail > 1) return; // double or more clicks
            if (slide.position < story.files.length - 1) {
                slide.next();
            }
            else {
                close.click();
            }
        }
        let useFotomoto = tooSmall ? null : true;
        function buyHandler(e) {
            e.stopPropagation();
            if (useFotomoto === null) {
                useFotomoto = confirm("Hey there, thanks!\n" +
                    'You seem to be on a mobile or a device with a rather small screen. ' +
                    'The thing is the printing service provider "Fotomoto" ' +
                    'doesn\'t work well on mobiles and small screens.' +
                    "\nI recommend you use a desktop, laptop, or at least a big tablet.\n\n" +
                    "Want to try anyhow?");
            }
            if (useFotomoto) {
                FOTOMOTO.API.showWindow(FOTOMOTO.API.CANVAS, imageUrl(story, slide.position));
            }
        }
        function checkoutHandler(e) {
            e.stopPropagation();
            FOTOMOTO.API.checkout();
        }
        function closeHandler(e) {
            e.stopPropagation();
            container.classList.remove("showing");
            controlHandlers(false);
        }
        function noHandler(e) { e.stopPropagation(); }
        function controlHandlers(add) {
            let fn = add ? "addEventListener" : "removeEventListener";
            img[1][fn]('click', nextHandler, false);
            img[1][fn]('touchstart', nextHandler, false);
            img[1][fn]('dragstart', nextHandler, false);
            close[fn]('click', closeHandler, false);
            buy[fn]('click', buyHandler, false);
            checkout[fn]('click', checkoutHandler, false);
        }
        function fotomotoInitialized() {
            buy.classList.add("show");
            setInterval(function () {
                checkout.classList.toggle("show", FOTOMOTO.API.getTotalItems() > 0);
            }, 1000);
        }

        slide.reset(position);
        container.classList.add("showing")
        controlHandlers(true);
        if (fotomotoLoaded) fotomotoInitialized()
        else if (fotomotoCallback.indexOf(fotomotoInitialized) < 0) fotomotoCallback.push(fotomotoInitialized);

    }
    function renderStory(template, storyData, delay) {
        function loadImages(story, index, container, delay) {
            if (index >= story.files.length) return;
            let image = imageTemplate.cloneNode();
            image.src = imageUrl(story, index, true);
            image.onload = image.onerror = function (event) {
                let dummy = container.querySelector(".dummy");
                if (dummy) {
                    container.removeChild(dummy);
                }
                if (event.type != "error") {
                    add(image, container);
                    ((image.width > image.height) ? landscapeImages : portraitImages).push(imageUrl(story, index));
                }
                setTimeout(function () {
                    image.classList.remove("new");
                    image.onclick = function () {
                        fullScreen(story, index);
                    }
                    loadImages(story, index + 1, container, delay);
                }, 1 + index * 10 + delay * 50);

            }
        }
        let story = template.cloneNode(true);
        story.querySelector(".title").innerText = storyData.title + ".";
        let storyLines = storyData.text;
        if (storyLines == "yada")
            for (let x = 0; x < Math.random() * 100; x++) storyLines += " yada"
        story.querySelector(".lines").innerText = storyLines;
        let counter = 0;
        loadImages(storyData, 0, story, delay);
        return story;
    }

    function slideShow(data, firstLoaded) {
        function randomIndex(a) { return Math.floor(Math.random() * a.length); }

        let first = true,
            previous = -1,
            slide = new window.slide({
                id: 'header .welcome',
                source: function imageSource(position) {
                    let images = window.innerWidth > window.innerHeight ? landscapeImages : portraitImages;
                    if (images.length > 0) {
                        return images[randomIndex(images)];
                    }
                    const story = data[randomIndex(data)];
                    return imageUrl(story, randomIndex(story.files));
                },
                loaded: function imageLoaded(position) {
                    if (first && firstLoaded) {
                        first = false;
                        firstLoaded();
                    }
                },
                onChange: function onChange() { },
                auto: 10000
            });
    }

    function loaded() {
        htmlClasses.remove('loading');
        htmlClasses.add('loaded');
    }

    // hooks
    document.querySelectorAll('.intro code').forEach(function (code) {
        code.addEventListener('click', function (e) {
            const address = code.innerText;
            let range = document.createRange(),
                successful = false;
            range.selectNode(code);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);

            if (navigator.clipboard) {
                navigator.clipboard.writeText(address).then(function () { successful = true; }, function (e) { });
            }
            else {
                try {
                    successful = document.execCommand('copy');
                } catch (err) { }
            }
            if (successful) {
                window.getSelection().removeAllRanges();
                code.innerText = 'copied!';
                setTimeout(function () { code.innerText = address; }, 1000);
            }
        });
        code.title = 'Click to copy address';
    });
    document.querySelector('.theme.toggle').addEventListener('click', function (e) {
        const isBright = htmlClasses.contains('bright');
        htmlClasses.toggle('bright', !isBright);
        htmlClasses.toggle('dark', isBright);
    });

    // init

    slideShow(data, function firstSlideShowImageLoaded() {
        loaded();
    });

    let delay = 0
    for (let storyData of data) {
        add(renderStory(storyTemplate, storyData, delay++), container);
    }

    // load fotomoto
    function loadScript(url, callback) {
        var script = document.createElement("script");
        if (callback) {
            script.onload = callback;
        }
        document.head.appendChild(script);
        script.src = url;
    }

    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.slim.min.js", function () {
        loadScript("//widget.fotomoto.com/stores/script/7ac4f5e25748acfee580b24ed7c401c3003b6fe5.js?api=true");
    });

    // setTimeout(loaded, 3000 + Date.now() - window.loadingStarted);
}

function fotomoto_loaded() {
    fotomotoLoaded = true;
    for (let callback of fotomotoCallback) {
        callback();
    }
    let frame = document.querySelector('#fm_analytic_frame');
    if (frame) frame.parentNode.removeChild(frame);
}

document.addEventListener("DOMContentLoaded", load, false);

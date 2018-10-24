'use strict';
let fotomotoLoaded = false,
    fotomotoCallback = [];
function load() {
    let local = location.href.indexOf('file:///') > -1,
        container = document.querySelector("section.stories"),
        storyTemplate = getTemplate(".story", container),
        imageTemplate = getTemplate("img", storyTemplate);

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
        let width = 431, height = 288,
            file = story.files[position],
            fileLocation = "../photos/" + story.id + "/" + file;
        // phones are about 600-700px high, tablets around 1000, so 400-based steps should be fine
        if (!thumbnail) width = height = Math.ceil(Math.max(window.innerWidth, window.innerHeight) / 400) * 400;
        return local ? fileLocation : "http://svenbuschbeck.photography/phpThumb/phpThumb.php?w=" + width + "&h=" + height + "&src=../" + fileLocation;
    }
    function fullScreen(story, position) {

        var slide = new window.slide({
                id: '#fullscreen',
                source: function imageSource(position) {
                    return imageUrl(story, position);
                },
                onChange: function onChange(position){
                    if (fotomotoLoaded) {
                        FOTOMOTO.API.checkinImage(imageUrl(story, position));
                    }
                }});
        var img       = slide.img,
            container = slide.container,
            buy       = container.querySelector(".buy"),
            checkout  = container.querySelector(".checkout");

        function nextHandler(e) {
            e.stopPropagation();
            if (e.detail > 1) return; // double or more clicks
            slide.next();
        }
        function buyHandler(e) {
            e.stopPropagation();
            FOTOMOTO.API.showWindow(FOTOMOTO.API.CANVAS, imageUrl(story, slide.position));
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
            container.querySelector(".close")[fn]('click', closeHandler, false);
            buy[fn]('click', buyHandler, false);
            checkout[fn]('click', checkoutHandler, false);
        }
        function fotomotoInitialized() {
            buy.classList.add("show");
            setInterval(function() {
                checkout.classList.toggle("show", FOTOMOTO.API.getTotalItems() > 0);
            }, 1000);
        }

        slide.reset(position);
        container.classList.add("showing")
        controlHandlers(true);
        if (fotomotoLoaded) fotomotoInitialized()
        else if (fotomotoCallback.indexOf(fotomotoInitialized) < 0) fotomotoCallback.push(fotomotoInitialized);

    }
    function renderStory(template, storyData) {
        function loadImages(story, index, container, priority) {
            if (index >= story.files.length) return;
            let image = imageTemplate.cloneNode();
            image.src = imageUrl(story, index, true);
            image.onload = image.onerror = function(event) {
                let dummy = container.querySelector(".dummy");
                if (dummy) {
                    container.removeChild(dummy);
                }
                if (event.type != "error") add(image, container);
                setTimeout(function(){
                    image.classList.remove("new");
                    image.onclick = function() {
                        fullScreen(story, index);
                    }
                    loadImages(story, index + 1, container, priority);
                }, 1 + index*10 + priority*50);
            }
        }
        let story = template.cloneNode(true);
        story.querySelector(".title").innerText = storyData.title + ".";
        let storyLines = storyData.text;
        if (storyLines == "yada")
            for (let x = 0; x < Math.random()*100; x++) storyLines += " yada"
        story.querySelector(".lines").innerText = storyLines;
        let counter = 0;
        loadImages(storyData, 0, story, priority);
        return story;
    }

    function randomIndex(a) { return Math.floor(Math.random() * a.length); }

    function slideShow(data) {
        var slide = new window.slide({
                id: 'header .welcome',
                source: function imageSource(position) {
                    const story = data[randomIndex(data)];
                    return imageUrl(story, randomIndex(story.files));
                },
                onChange: function onChange(){ },
                auto: 10000 });
    }

    slideShow(data);

    let priority = 0
    for (let storyData of data) {
        add(renderStory(storyTemplate, storyData, priority++), container);
    }
}

function fotomoto_loaded() {
    fotomotoLoaded = true;
    for (callback of fotomotoCallback) {
        callback();
    }
    let frame = document.querySelector('#fm_analytic_frame');
    if (frame) frame.parentNode.removeChild(frame);
}

document.addEventListener("DOMContentLoaded", load, false);

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
    function imageUrl(file, storyId, thumbnail) {
        // for mobile, the thumbnails could be 360x240, should be about the same
        let width = 431, height = 288,
            fileLocation = "../photos/" + storyId + "/" + file;
        // phones are about 600-700px high, tablets around 1000, so 400-based steps should be fine
        if (!thumbnail) width = height = Math.ceil(Math.max(window.innerWidth, window.innerHeight) / 400) * 400;
        return local ? fileLocation : "http://svenbuschbeck.photography/phpThumb/phpThumb.php?w=" + width + "&h=" + height + "&src=../" + fileLocation;
        //return local ? fileLocation : "http://svenbuschbeck.photography/phpThumb/phpThumb.php/" + width + "x" + height + ";../" + fileLocation;
    }
    function fullScreen(file, story) {
        let container = document.querySelector('#fullscreen'),
            img       = container.querySelectorAll(".image"),
            buy       = container.querySelector(".buy"),
            checkout  = container.querySelector(".checkout");

        function load(index, file, story) {
            let image = img[index]; // no with(img[index]) { ... } in strict mode :(
            image.dataset.id = file;
            image.dataset.url = imageUrl(file, story.id);
            image.style.backgroundImage = "url(\"" + image.dataset.url + "\")";
        }
        function nextId(currentId, story) {
            return story.files[(story.files.indexOf(currentId) + 1) % story.files.length];
        }
        function loadNext(index, currentId, story) {
            load(index, nextId(currentId, story), story);
        }
        function getCurrent() {
            return img[0].classList.contains("current") ? 0 : 1;
        }
        function checkCart() {
        }
        function setCurrent(index) {
            img[index].classList.add("current");
            img[index ^ 1].classList.remove("current");

            if (fotomotoLoaded) {
                FOTOMOTO.API.checkinImage(img[index].src);
            }
            return index;
        }
        function toggle() {
            let current = getCurrent(), next = current ^ 1;
            setCurrent(next);
            // transitionend event not well supported over all browsers.
            setTimeout(function() { loadNext(current, img[next].dataset.id, story); }, 666);
        }
        function nextHandler(e) {
            e.stopPropagation();
            if (e.detail > 1) return; // double click or more
            toggle();
        }
        function buyHandler(e) {
            e.stopPropagation();
            FOTOMOTO.API.showWindow(FOTOMOTO.API.CANVAS, img[getCurrent()].dataset.url);
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
            //img[1][fn]('dblclick', noHandler, false);
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

        load(0, file, story);
        setTimeout(function() { loadNext(1, file, story); }, 100);
        setCurrent(0);
        container.classList.add("showing")
        controlHandlers(true);
        if (fotomotoLoaded) fotomotoInitialized()
        else if (fotomotoCallback.indexOf(fotomotoInitialized) < 0) fotomotoCallback.push(fotomotoInitialized);

    }
    function renderStory(template, storyData) {
        function loadImages(story, index, container, priority) {
            if (index >= story.files.length) return;
            let file = story.files[index],
                image = imageTemplate.cloneNode(),
                dummy;
            image.dataset.id = file;
            image.src = imageUrl(file, story.id, true);
            image.onload = image.onerror = function(event) {
                if (dummy = container.querySelector(".dummy")) {
                    container.removeChild(dummy);
                }
                if (event.type != "error") add(image, container);
                setTimeout(function(){
                    image.classList.remove("new");
                    image.onclick = function() {
                        fullScreen(file, story);
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
}

document.addEventListener("DOMContentLoaded", load, false);

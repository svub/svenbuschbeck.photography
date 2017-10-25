function load() {
    let local = location.href.indexOf('file:///') > -1,
        container = document.querySelector("section.stories"),
        storyTemplate = getTemplate(".story", container),
        imageTemplate = getTemplate("img", storyTemplate),
        fullscreenInitialized = false;

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
    }
    function fullScreen(file, story) {
        let container = document.querySelector('#fullscreen'),
            img       = container.querySelectorAll(".image"),
            buy       = container.querySelector(".buy");
            checkout  = container.querySelector(".checkout");

        function load(index, file, story) {
            with(img[index]) {
                dataset.id = file;
                dataset.url = imageUrl(file, story.id);
                style.backgroundImage = "url(\"" + dataset.url + "\")";
            }
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
        function setCurrent(index) {
            img[index].classList.add("current");
            img[index ^ 1].classList.remove("current");

            if (typeof FMJQ == "function") {
                checkout.classList.toggle("show", FOTOMOTO.API.getTotalItems() > 0);
                FOTOMOTO.API.checkinImage(img[index].src);
            }
            return index;
        }
        if (!fullscreenInitialized) {
            fullscreenInitialized = true;
            function toggle() {
                let current = getCurrent(), next = current ^ 1;
                setCurrent(next);
                // TODO wait for animation to end
                setTimeout(function() { loadNext(current, img[next].dataset.id, story); }, 666);
            }
            img[1].addEventListener('click', function(e) { e.stopPropagation(); toggle(); }, false);
            container.querySelector(".close").addEventListener('click', function(e) {
                e.stopPropagation();
                container.classList.remove("showing");
            }, false);
            buy.addEventListener('click', function(e) {
                e.stopPropagation();
                FOTOMOTO.API.showWindow(FOTOMOTO.API.CANVAS, img[getCurrent()].dataset.url);
            }, false);
            checkout.addEventListener('click', function(e) {
                e.stopPropagation();
                FOTOMOTO.API.checkout();
            }, false);
            (function() {
                //console.log(0);
                if (typeof FMJQ == "function") {
                    //console.log(FMJQ.isReady);
                    if (FMJQ.isReady) return buy.classList.add("show");
                }
                setTimeout(arguments.callee, 250);
            })();
        }

        load(0, file, story);
        setTimeout(function() { loadNext(1, file, story); }, 100);
        setCurrent(0);
        container.classList.add("showing")
    }
    function renderStory(template, data) {
        function loadImages(list, story, container) {
            if (list.length < 1) return;
            let file = list.shift(),
                image = imageTemplate.cloneNode(),
                dummy;
            image.dataset.id = file;
            image.src = imageUrl(file, story.id, true);
            image.onload = function() {
                if (dummy = container.querySelector(".dummy")) {
                    container.removeChild(dummy);
                }
                add(image, container);
                setTimeout(function(){
                    image.classList.remove("new");
                    image.onclick = function() {
                        fullScreen(file, story);
                    }
                    loadImages(list, story, container);
                }, 1);
            }
        }
        let story = template.cloneNode(true);
        story.querySelector(".title").innerText = storyData.title;
        let storyLines = storyData.text;
        if (storyLines == "yada")
            for (let x = 0; x < Math.random()*100; x++) storyLines += " yada"
        story.querySelector(".lines").innerText = storyLines;
        let counter = 0;
        loadImages(storyData.files.slice(), storyData, story);
        return story;
    }

    for (storyData of data) {
        storyElement = renderStory(storyTemplate, storyData);
        add(storyElement, container);
    }
}

document.addEventListener("DOMContentLoaded", load, false);

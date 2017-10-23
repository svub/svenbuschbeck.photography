let $=document.querySelector.bind(document), $$=document.querySelectorAll.bind(document);

function load() {
    let local = location.href.indexOf('file:///') > -1,
        container = $("section.stories"),
        storyTemplate = getTemplate(".story", container),
        imageTemplate = getTemplate("img", storyTemplate),
        fullscreenInitialized = false;

    function getTemplate(selector, container) {
        let template = $(selector + ".template", container);
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
        // TODO find good bounding box values for w and h depending on device
        // current values are max bb as used for full hd display
        let width = 430, height = 288,
            fileLocation = "../photos/" + storyId + "/" + file;
        if (!thumbnail) width = height = Math.max(window.innerWidth, window.innerHeight);
        return local ? fileLocation : "http://svenbuschbeck.photography/phpThumb/phpThumb.php?w=" + width + "&h=" + height + "&src=../" + fileLocation;
    }
    function fullScreen(file, story) {
        let container = $('#fullscreen'),
            img  = container.querySelectorAll("img");

        function load(index, file, story) {
            with(img[index]) {
                src = imageUrl(file, story.id);
                dataset.id = file;
            }
        }
        function nextId(currentId, story) {
            return story.files[(story.files.indexOf(currentId) + 1) % story.files.length];
        }
        function loadNext(index, currentId, story) {
            load(index, nextId(currentId, story), story);
        }
        if (!fullscreenInitialized) {
            function toggle() {
                let current = 0, next = 1;
                if (img[1].classList.contains("current")) { current = 1; next = 0; }
                img[current].classList.remove("current");
                img[next].classList.add("current");
                // TODO wait for animation to end
                setTimeout(function() { loadNext(current, img[next].dataset.id, story); }, 500);
            }
            //img[0].onclick = function() { toggle(0); }
            img[1].onclick = function() { toggle(); }
        }

        load(0, file, story);
        loadNext(1, file, story);
        img[0].classList.add("current");
        img[1].classList.remove("current");
        container.classList.add("showing")
        //img.onload = function() {
        //    next.src = getUrl(getNext(image));
        //}
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

let $=document.querySelector.bind(document), $$=document.querySelectorAll.bind(document);

function load() {
    let local = location.href.indexOf('file:///') > -1;
    let container = $("section.stories");
    let storyTemplate = getTemplate(".story", container);
    let imageTemplate = getTemplate("img", storyTemplate);

    function getTemplate(selector, container) {
        let template = $(selector + ".template", container);
        template = template.cloneNode(true);
        let classes = template.attributes.getNamedItem("class")
        classes.nodeValue = classes.nodeValue.replace("template", "").trim();
        return template;
    }
    function add(node, container) {
        container.appendChild(node);
    }
    function renderStory(template, data) {
        let story = template.cloneNode(true);
        story.querySelector(".title").innerText = storyData.title;
        let storyLines = storyData.text;
        if (storyLines == "yada")
            for (let x = 0; x < Math.random()*100; x++) storyLines += " yada"
        story.querySelector(".lines").innerText = storyLines;
        let counter = 0;
        for (file of storyData.files) {
            let image = imageTemplate.cloneNode();
            let fileLocation = "photos/" + storyData.id + "/" + file;
            image.dataset.location = fileLocation;
            // TODO find good bounding box values for w and h depending on device
            // current values are max bb as used for full hd display
            image.src = local ? fileLocation : "http://svenbuschbeck.photography/phpThumb/phpThumb.php?w=430&h=288&src=/" + fileLocation;
            setTimeout(function() { add(image, story); }, 25*counter++);
        }
        return story
    }

    for (storyData of data) {
        storyElement = renderStory(storyTemplate, storyData);
        add(storyElement, container);
    }
}

document.addEventListener("DOMContentLoaded", load, false);

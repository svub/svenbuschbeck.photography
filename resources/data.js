let data = [];

addData(
    "2015-1",
    "July and August 2015",
    "Singapore and road trip in the northern Australia",
    "Ilford HP5",
    "Vision Imagelab Sydney",
    imageRange("F10000", 1, 36, ".JPG"));
addData(
    "2015-2",
    "August to October 2015",
    "From 1770 to Sydney, Australia",
    "Fujifilm Superia X-tra 400",
    "Vision Imagelab Sydney",
    imageRange("F10100", 1, 26, ".JPG"));


// helpers

function addData(id, date, title, film, lab, files) {
    data.push({
        id: id,
        date: date,
        title: title,
        text: "yada",
        film: film,
        lab: lab,
        files: files,
    });
}

function imageRange(prefix, first, last, suffix) {
    let files = [];
    for (let x = first; x <= last; x++) {
        files.push(prefix + (x < 10 ? "0"+x : x) + suffix);
    }
    return files;
}

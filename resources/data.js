let data = [];

addData(
    "far-away",
    "Far away from anything",
    "Sometime you find places so far away, so far out, they seem unreal to (still) exist.",
    ["01-_17_00060.jpg","02-F1010022.JPG","03-000372030016_.jpg","04-_13_00056.jpg","05-_18_00061.jpg","06-_19_00062.jpg","07-_20_00063.jpg","08-_21_00064.jpg","09-_23_00066.jpg","10-_25_00068.jpg","11-_29_00072.jpg","12-000372030015.jpg","13-000372030017_.jpg","14-000372030028.jpg","15-000372030029.jpg","16-F1010003.JPG","17-F1010015.JPG","18-F1010019.JPG","19-IMG_20161221_0021.jpg"]);
addData(
    "broken",
    "Broken",
    "Each broken thing tells a story. A story of it's life.",
    ["01-imm007_N7.jpg","02-imm013_N13.jpg","03-imm016_N16.jpg","04-38790010.jpg","05-000372030010.jpg","06-000372030008.jpg","07-000372030026.jpg","08-F1000026.JPG","09-F1000027.JPG","10-F1010020.JPG","11-F1010023.JPG","12-IMG_20161221_0035_.jpg","13-imm005_N5.jpg","14-imm006_N6.jpg","15-imm010_N10.jpg","16-imm011_N11.jpg","17-imm027_N27.jpg","18-imm031_N31.jpg"]);
addData(
    "outdoors",
    "Living outdoors",
    "Touching bare soil, breathing fresh air, feeling space and time unite.",
    ["01-F1010010.JPG","02-F1000023.JPG","03-F1010007.JPG","04-F1010013.JPG","05-imm008_N8.jpg","06-imm009_N9.jpg","07-F1010001.JPG","08-imm020_N20.jpg","09-000372030012.jpg","10-imm023_N23.jpg","11-imm028_N28.jpg"]);
addData(
    "abandoned",
    "Abandoned",
    "Urban moon landscapes.",
    ["01-38790027_.jpg","02-38790023_.jpg","03-38790025.jpg","04-38790026.jpg","05-000366650025_.jpg","06-000366650027.jpg","07-38790028.jpg"]);
addData(
    "what-we-do",
    "What we do",
    "Work might be a negative word sometimes. It's what we do, our contribution to society that we feel passion and joy for, that we can take humble pride in.",
    ["01-__0_00043.jpg","02-__9_00052.jpg","03-__5_00048.jpg","04-_37_00080___.jpg","05-_16_00059_.jpg","06-_30_00073_.jpg","08-__6_00049_.jpg","09-__7_00050_.jpg","10-__8_00051.jpg","11-_12_00055.jpg"]);
addData(
    "from-place-to-place",
    "From place to place",
    "We travel. Life is our journey. The ways are manyfold.",
    ["01-38790016.jpg","02-F1000025.JPG","03-_11_00054.jpg","04-IMG_20161221_0025.jpg","05-F1000009.JPG","06-F1000018.JPG","07-F1000022.JPG","08-F1000028.JPG","09-F1010002.JPG","10-IMG_20161221_0014.jpg"]);
addData(
    "heritage",
    "Heritage",
    "Monuments for our roots and origins.",
    ["00-000372030030_.jpg","01-38790033_.jpg","02-IMG_20161221_0027.jpg","03-000372030031.jpg","04-000366650015.jpg","14-38790013_.jpg"]);
addData(
    "places-we-live",
    "Places we live",
    "Places as diverse as the people and families that live in them, with their thoughts, worries, believes, and values.",
    ["01-_27_00070.jpg","02-F1010026_.JPG","03-imm033_N33.jpg","04-_35_00078.jpg","05-000366650019.jpg","06-_36_00079_.jpg","07-imm034_N34_.JPG","08-38790014.jpg","08a-000366650024_.jpg","09-38790020.jpg","10-000366650011.jpg","11-000372030032.jpg","12-F1000001.JPG","13-F1000002.JPG","15-F1000006.JPG","16-F1000036.JPG","17-F1010025.JPG","18-IMG_20161221_0004.jpg","19-IMG_20161221_0006.jpg","20-imm032_N32.jpg","21-IMG_20161221_0018.jpg","22-imm017_N17.jpg","23-imm019_N19.jpg"]);

addData(
    "social",
    "Among our peers",
    "As humans, we are social animals. Our deepest beliefs are shaped and revealed by our social interactions.",
    ["01-_15_00058_.jpg","02-IMG_20161221_0030_.jpg","03-imm035_N35.jpg","04-__1_00044_.jpg","05-38790002.jpg","06-__2_00045.jpg","07-IMG_20161221_0019.jpg"]);
addData(
    "street-food",
    "Out on the street of Taiwan",
    "Food is everywhere. You will find delicacies in the most simple looking places.",
    ["01-000372030036.jpg","02-000366650009.jpg","03-000366650007.jpg","04-000366650034_.jpg","05-imm018_N18_.jpg","06-000366650008.jpg","07-000372030039_.jpg","08-000366650032.jpg","09-000366650033_.jpg","10-38790005_.jpg"]);
addData(
    "what-we-feel",
    "What we feel",
    "In moments of when we are unaware of our environment, our faces speak.",
    ["000366650002.jpg","000366650028.jpg","000366650036_.jpg","F1000008.JPG"]);






// helpers

function addData(id, title, text, files) {
    data.push({
        id: id,
        title: title,
        text: text,
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

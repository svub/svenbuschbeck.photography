'use strict';
let data = [{"id":"010-far-away","title":"Far away from anything","text":"Sometime you find places so far away, so far out, they seem unreal to (still) exist.","files":["01-_17_00060.jpg","02-F1010022.JPG","03-000372030016_.jpg","04-_13_00056.jpg","05-_18_00061.jpg","06-_19_00062.jpg","07-_20_00063.jpg","08-_21_00064.jpg","09-_23_00066.jpg","10-_25_00068.jpg","11-_29_00072.jpg","12-000372030015.jpg","13-000372030017_.jpg","14-000372030028.jpg","15-000372030029.jpg","17-F1010015.JPG","18-F1010019.JPG","19-IMG_20161221_0021.jpg"]},{"id":"020-broken","title":"Broken","text":"Each broken thing tells a story. A story of it's life.","files":["01-imm007_N7.jpg","02-imm013_N13.jpg","03-imm016_N16.jpg","04-38790010.jpg","05-000372030010.jpg","06-000372030008.jpg","08-F1000026.JPG","09-F1000027.JPG","10-F1010020.JPG","11-F1010023.JPG","12-IMG_20161221_0035_.jpg","13-imm005_N5.jpg","14-imm006_N6.jpg","15-imm010_N10.jpg","16-imm011_N11.jpg","17-imm027_N27.jpg","18-imm031_N31.jpg"]},{"id":"030-living-outdoors","title":"Living outdoors","text":"Touching bare soil, breathing fresh air, feeling space and time unite.","files":["01a-F1010010.JPG","01b-000479100028_.jpg","02-F1000023.JPG","03-F1010007.JPG","05a-imm008_N8.jpg","05b000466950011.jpg","06-imm009_N9.jpg","07-F1010001.JPG","08-imm020_N20.jpg","09-imm023_N23.jpg","10-000372030012.jpg","11-imm028_N28.jpg"]},{"id":"040-abandoned","title":"Abandoned","text":"Urban moon landscapes, forgotten places.","files":["01-38790027_.jpg","02-38790023_.jpg","03-38790025.jpg","04-38790026.jpg","05-000366650025_.jpg","06-000366650027.jpg","07-38790028.jpg"]},{"id":"050-what-we-do","title":"What we do","text":"It's what people do, their contribution to society that they feel passion and joy for, that they take humble pride in.","files":["01a-__5_00048.jpg","01b-000466950016.jpg","01c-000479100032_.jpg","02-__9_00052.jpg","03a-000468970007.jpg","03b-000479100005__.jpg","03c-000466940018.jpg","03d-000466940031__.jpg","03e-__0_00043.jpg","03f-000466940013___.jpg","04-_37_00080___.jpg","05-_16_00059_.jpg","06-_30_00073_.jpg","09-__7_00050_.jpg","10-__8_00051.jpg","11-_12_00055.jpg"]},{"id":"060-from-place-to-place","title":"From place to place","text":"We travel. Life is our journey. The ways are manyfold.","files":["01a-000466940012.jpg","01b-000468970001_.jpg","01c-38790016.jpg","01d-000468970002.jpg","02a-F1000025.JPG","02b-000479100038_.jpg","02c-IMG_20161221_0025.jpg","02d-000479100015_.jpg","03-_11_00054.jpg","05-F1000009.JPG","06a-F1000018.JPG","06b-000479100018.jpg","07-F1000022.JPG","08-F1000028.JPG","09-F1010002.JPG","10-IMG_20161221_0014.jpg"]},{"id":"070-heritage","title":"Heritage","text":"Monuments of our roots and origins.","files":["01-__6_00049_.jpg","01b-000466940004.jpg","02-38790033_.jpg","03-000372030031.jpg","04-000366650015.jpg","14-38790013_.jpg"]},{"id":"080-places-we-live","title":"Places we live","text":"The places are as diverse as the people and families that live in them, with their believes, thoughts, ideas, worries, and values.","files":["01a-000479100021_.jpg","01b-F1010026_.JPG","01c-_27_00070.jpg","03-imm033_N33.jpg","04-_35_00078.jpg","05-000366650019.jpg","06-_36_00079_.jpg","07-imm034_N34_.JPG","08-38790014.jpg","08a-000366650024_.jpg","09-38790020.jpg","10-000366650011.jpg","11-000372030032.jpg","12-F1000001.JPG","13-F1000002.JPG","14-000466940010.jpg","15-F1000006.JPG","16-F1000036.JPG","17-F1010025.JPG","18-IMG_20161221_0004.jpg","19-IMG_20161221_0006.jpg","20-imm032_N32.jpg","21-IMG_20161221_0018.jpg","22a-imm017_N17.jpg","22b-000479100017_.jpg","22c-000468970008.jpg","23-imm019_N19.jpg","24-000466940006.jpg","25-000479100039_.jpg"]},{"id":"090-among-our-peers","title":"Among our peers","text":"As humans, we are social animals. We need to give and receive love as much as we need to breathe. Our deepest beliefs are shaped and revealed by our social interactions.","files":["01-_15_00058_.jpg","02a-000479100019_.jpg","02b-38790002.jpg","03a-imm035_N35.jpg","03c-IMG_20161221_0030_.jpg","04-__1_00044_.jpg","06-__2_00045.jpg","07-IMG_20161221_0019.jpg"]},{"id":"100-out-on-the-streets-of-taiwan","title":"Out on the street of Taiwan","text":"Food is everywhere. You will find delicacies in the most simple looking places.","files":["01a-000479100023_.jpg","01b-000372030036.jpg","02-000366650009.jpg","03-000366650007.jpg","04-000366650034_.jpg","05-imm018_N18_.jpg","06-000366650008.jpg","07-000372030039_.jpg","08a-000366650032.jpg","08b-000466940035_.jpg","09-000366650033_.jpg","10-38790005_.jpg"]},{"id":"110-what-we-feel","title":"What we feel","text":"In moments when we are unaware of our environment, our faces speak.","files":["01-000466950004_.jpg","02-000366650028.jpg","03-000479100003_.jpg","04-000366650002.jpg","05-000366650036_.jpg","06-F1000008.JPG"]},{"id":"120-factories","title":"Factories and machinery","text":"The places we work at and the tools we use define what is being done.","files":["01-000466950022.jpg","02-IMG_20161221_0027.jpg","03-000466950025.jpg","07-000372030026.jpg"]},{"id":"130-colors-of-nature","title":"Colors of nature","text":"Did you ever notice that in nature, any combination of colors seem to match beautifully?","files":["01-000468970025.jpg","02-F1010003.JPG","03-000479100007.jpg","04-F1010013.JPG","05-000468970032_.jpg","06-000479100010_.jpg"]}]

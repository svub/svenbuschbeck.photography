#!/usr/bin/env node

const fs = require("fs"),
    path = require('path'),
    sharp = require('sharp'),
    rimraf = require("rimraf"),
    photosIn = '../photos/',
    outRoot = 'docs',
    photosOut = `${outRoot}/photos`,
    index = `${outRoot}/resources/data.js`,
    stories = fs.readdirSync(photosIn).map(dir => readStory(photosIn, dir)).filter(story => story != null);

writeIndex(stories);
rimraf.sync(photosOut);
fs.mkdirSync(photosOut);
resizeImages(stories);

function writeIndex(stories) {
    const data = `'use strict'; let data = ${JSON.stringify(stories)}`;
    fs.writeFileSync(index, data);
}

async function resizeImages(stories) {
    for (const story of stories) {
        console.log(`Processing ${photosOut}/${story.id}`);
        fs.mkdirSync(`${photosOut}/${story.id}`);
        for (const file of story.files) {
            console.log(`Preparing ${photosIn}/${story.id}/${file}`);
            await Promise.all([400, 800, 1200, 1600, 2000].map(dimension => {
                return sharp(`${photosIn}/${story.id}/${file}`)
                    .resize(dimension, dimension, { fit: sharp.fit.inside })
                    .toFile(`${photosOut}/${story.id}/${dimension}-${file}`)
                    .catch(err => console.log(err));
            }));
        }
    }
}

function readStory(root, dirName) {
    const folder = `${root}/${dirName}`,
        dataFile = `${folder}/text.json`;

    if (!fs.existsSync(dataFile)) return;

    var options = JSON.parse(fs.readFileSync(dataFile)),
        images = fs.readdirSync(folder).filter(file => path.extname(file).toLowerCase() === '.jpg');

    return {
        id: dirName,
        title: options.title,
        text: options.description,
        files: images
    };
}

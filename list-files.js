#!/usr/bin/env node

const fs = require("fs"),
      path = require('path');

var root = '../photos/',
    stories = [];

fs.readdirSync(root).forEach(dir => readStory(root, dir));
console.log("'use strict';");
console.log("let data = " + JSON.stringify(stories));

function readStory(root, dirName) {
  var folder = root + dirName,
      dataFile = folder + '/text.json';
  if (!fs.existsSync(dataFile)) return

  var options = JSON.parse(fs.readFileSync(dataFile)),
      images = fs.readdirSync(folder).filter(file => path.extname(file).toLowerCase() === '.jpg');
  stories.push({
    id: dirName,
    title: options.title,
    text: options.description,
    files: images });
}


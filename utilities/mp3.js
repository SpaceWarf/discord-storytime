const path = require("path");
const fs = require('fs');
const { getRandomArrayElement } = require('./array');

const getRandomFile = () => {
  const files = fs.readdirSync(path.join(__dirname, '../public/audio'));
  console.log('All audio files: ' + files);
  return path.join(__dirname, `../public/audio/${getRandomArrayElement(files)}`);
};

const getFile = name => {
  console.log('Fetching sounds from: ' + path.join(__dirname, `../public/audio`));
  return path.join(__dirname, `../public/audio/${name}.mp3`);
};

module.exports = {
  getRandomFile,
  getFile
};

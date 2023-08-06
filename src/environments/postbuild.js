const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

// script from here:
// https://dev.to/dylanvdmerwe/reduce-angular-style-size-using-purgecss-to-remove-unused-styles-3b2k

const DIST_PATH = '././dist/fd-frontend/';

// Find the styles css file
const files = getFilesFromPath(DIST_PATH, '.css');
console.log(files);
let data = [];

if (!files || files.length <= 0) {
  console.log('Cannot find style files to purge');
}

for (let f of files) {
  // Get original file size
  const originalSize = getFilesizeInKiloBytes(DIST_PATH + f) + 'kb';
  var o = { file: f, originalSize: originalSize, newSize: '' };
  data.push(o);
}

console.log('Run PurgeCSS...');

exec(`purgecss -css ${DIST_PATH}*.css --content ${DIST_PATH}index.html ${DIST_PATH}*.js -o ${DIST_PATH}`, function () {
  console.log('PurgeCSS done');
  console.log();

  for (let d of data) {
    // Get new file size
    const newSize = getFilesizeInKiloBytes(DIST_PATH + d.file) + 'kb';
    d.newSize = newSize;
  }

  console.table(data);
});

function getFilesizeInKiloBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size / 1024;
  return fileSizeInBytes.toFixed(2);
}

function getFilesFromPath(dir, extension) {
  let files = fs.readdirSync(dir);
  return files.filter((e) => path.extname(e).toLowerCase() === extension);
}

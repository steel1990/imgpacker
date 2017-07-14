const debug = require('debug')('imgpacker:getImage');
const Jimp = require('jimp');
const TGA = require('tga');


function getImage(type, buffer) {
    debug('getImage');
    return new Promise((resolve, reject) => {
        if (type === 'tga') {
            var tga = new TGA(buffer);
            var img = new Jimp(tga.width, tga.height);
            img.bitmap.data = tga.pixels.buffer;
            resolve(img);
        } else {
            Jimp.read(buffer, (err, img) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(img);
                }
            });
        }
    });
}

module.exports = getImage;
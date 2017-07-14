const debug = require('debug')('imgpacker:index');
const PNG = require('pngjs').PNG;
const getImage = require('./getImage');

function pack(opt) {
    debug('pack', opt);
    return Promise.all(['R', 'G', 'B', 'A'].map(chanel => {
        var data = opt[chanel];
        if (!data) {
            return Promise.resolve();
        }
        return getImage(data.type, data.buffer);
    })).then(imgs => {
        var destWidth = opt.width || 0;
        var destHeight = opt.height || 0;

        if (!destWidth || !destHeight) {
            imgs.forEach(img => {
                if (img) {
                    destWidth = Math.max(destWidth, img.bitmap.width);
                    destHeight = Math.max(destHeight, img.bitmap.height);
                }
            });
        }

        return Promise.all(imgs.map(img => {
            if (!img) {
                return Promise.resolve();
            }
            if (destWidth !== img.width && destHeight !== img.height) {
                img.resize(destWidth, destHeight);
            }
            return img;
        })).then(imgs => {
            var count = destWidth * destHeight * 4;
            var packedPixels = new Uint8Array(count);
            for (var i = 0; i < count; i += 4) {
                for (var j = 0; j < 4; j++) {
                    var img = imgs[j];
                    if (img) {
                        packedPixels[i + j] = img.bitmap.data[i];
                    } else if (j === 3) {
                        packedPixels[i + j] = 255;
                    }
                }
            }
            return {
                width: destWidth,
                height: destHeight,
                data: packedPixels
            };
        });
    }).then(img => {
        debug('pack done', img.width, img.height);
        return PNG.sync.write(img);
    });
}

exports.pack = pack;
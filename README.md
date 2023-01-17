imgpacker [![npm][npm-image]][npm-url]
========
This is a pure Node.js module for package multiple images(max 4) to a single image(in diffrent chanel).

Requirements
========
* Node.js v6

Installation
========
```
$ npm install imgpacker --save
```

Command line
========
command to pack metallic, ao and roughness textures to a single image, and convert roughness to smoothness.

```shell
imgpacker -R metallic.png -G ao.png -A roughness.png --flip A -o mask.png
```

```
Usage: imgpacker [options] [command]

  Options:
    -w <size>      output image width (default: 1024)
    -h <size>      output image height (default: 1024)
    -R <path>      red channel input image
    -G <path>      green channel input image
    -B <path>      blue channel input image
    -A <path>      alpha channel input image
    --rc <RGBA>    which channel to read from the red channel input image
    --gc <RGBA>    which channel to read from the green channel input image
    --bc <RGBA>    which channel to read from the blue channel input image
    --ac <RGBA>    which channel to read from the alpha channel input image
    --flip <RGBA>  channels need flip(255-origin), if you want to flip R channel then pass "R"
    -o <path>      output file
    --help         display help for command
```

API
========
### pack(opt)
* opt.width: output image width, find the max width if you don't pass.
* opt.height: output image height, find the max height if you don't pass.
* opt.R: output image R chanel image data
    * opt.R.buffer: the source image file buffer(fs.readFile)
* opt.G: output image G chanel image data
* opt.B: output image B chanel image data
* opt.A: output image A chanel image data

Example
========
```js
const fs = require('fs');
const imgPacker = require('imgpacker');

imgPacker.pack({
    width: 1024,
    height: 1024,
    R: {
        buffer: fs.readFileSync('./rustedmetalmix-ao.png')
    },
    G: {
        buffer: fs.readFileSync('./rustedmetalmix-roughness.png')
    },
    B: {
        buffer: fs.readFileSync('./rustedmetalmix-metalness.png')
    }
}).then(buffer => {
    fs.writeFileSync('./packed.png', buffer);
});
```


[npm-image]: https://img.shields.io/npm/v/imgpacker.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/imgpacker
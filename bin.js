#!/usr/bin/env node

const fs = require('fs');
const args = require('args');
const imgPacker = require('./index');

args
  .option('w', 'output image width', 1024)
  .option('h', 'output image height', 1024)
  .option('R', 'red channel input image')
  .option('G', 'green channel input image')
  .option('B', 'blue channel input image')
  .option('A', 'alpha channel input image')
  .option('flip', 'channels need flip (RGBA), if you want to flip R channel then pass "R"')
  .option('o', 'output file');

const flags = args.parse(process.argv);


const opt = {
  width: flags.w,
  height: flags.h,
};

'RGBA'.split('').forEach(channel => {
  if (flags[channel]) {
    opt[channel] = {
      buffer: fs.readFileSync(flags[channel])
    };
    if (flags.flip?.includes(channel)) {
      opt[channel].converter = (v, rgb) => {
        return 255 - v;
      };
    }
  }
});

imgPacker.pack(opt).then(buffer => {
    fs.writeFileSync(flags.o, buffer);
});
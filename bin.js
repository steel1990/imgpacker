#!/usr/bin/env node

const fs = require('fs');
const { program } = require('commander');
const imgPacker = require('./index');

program
  .option('-w <size>', 'output image width', 1024)
  .option('-h <size>', 'output image height', 1024)
  .option('-R <path>', 'red channel input image')
  .option('-G <path>', 'green channel input image')
  .option('-B <path>', 'blue channel input image')
  .option('-A <path>', 'alpha channel input image')
  .option('--rc <RGBA>', 'which channel to read from the red channel input image')
  .option('--gc <RGBA>', 'which channel to read from the green channel input image')
  .option('--bc <RGBA>', 'which channel to read from the blue channel input image')
  .option('--ac <RGBA>', 'which channel to read from the alpha channel input image')
  .option('--flip <RGBA>', 'channels need flip (RGBA), if you want to flip R channel then pass "R"')
  .requiredOption('-o <path>', 'output file');

program.parse();

const flags = program.opts();

// console.log(flags)

const opt = {
  width: flags.w,
  height: flags.h,
};

'RGBA'.split('').forEach(channel => {
  if (flags[channel]) {
    opt[channel] = {
      buffer: fs.readFileSync(flags[channel])
    };
    if (flags[channel.toLowerCase() + 'c']) {
      opt[channel].channel = flags[channel.toLowerCase() + 'c'];
    }
    if (flags.flip?.includes(channel)) {
      opt[channel].converter = (v, rgb) => {
        return 255 - v;
      };
    }
  }
});

imgPacker.pack(opt).then(buffer => {
    fs.writeFileSync(flags.o, buffer);
    console.log('packed image saved at', flags.o);
});
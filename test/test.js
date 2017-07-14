const fs = require('fs');
var imgPacker = require('../index');

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
    console.log(buffer);
    fs.writeFileSync('./packed.png', buffer);
})
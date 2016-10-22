var zlib = require('zlib');
var fs = require('fs');


class UncompressionGatewayNode {

    uncompress(url, dest) {
        const gunzip = zlib.createGunzip()
        const input = fs.createReadStream(url)
        const output = fs.createWriteStream(dest)
        input.pipe(gunzip).pipe(output)
        output.on('close', function () {
            input.unpipe(gunzip)
            input.unpipe(output)
        })
    }

}

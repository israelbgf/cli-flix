var zlib = require('zlib');
var fs = require('fs');


class UncompressionGatewayNode {

    uncompress(url, dest) {
        return new Promise((resolve, reject) => {
            let gunzip = zlib.createGunzip()
            let input = fs.createReadStream(url)
            let output = fs.createWriteStream(dest)
            input.pipe(gunzip).pipe(output)

            output.on('close', function () {
                input.unpipe(gunzip)
                input.unpipe(output)
                resolve()
            })
        })
    }

}

module.exports = UncompressionGatewayNode

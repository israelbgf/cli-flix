var path = require('path')
var shell = require('shelljs');


class VLCTorrentPlayerGateway {
    play(magnetLink, subtitle) {
        return new Promise((resolve, reject) => {
            let peerflixExcutable = path.join(__dirname, '..', '..', 'node_modules', 'peerflix', 'app.js')
            shell.exec(`${peerflixExcutable} "${magnetLink}" -q -p 8888 --on-listening --fullscreen "vlc --sub-file ${subtitle}"`)
        })
    }
}

module.exports = VLCTorrentPlayerGateway



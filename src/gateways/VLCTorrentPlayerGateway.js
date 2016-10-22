var path = require('path')
var shell = require('shelljs');


class VLCTorrentPlayerGateway {
    play(magnetLink, subtitle) {
        let peerflixExcutable = path.join(__dirname, '..', '..', 'node_modules', 'peerflix', 'app.js')
        let secondProccessThatWontBeKilledAtTheEndOfThisNodeApp = path.join(__dirname, 'VLCTorrentPlayerGateway.sh')
        shell.exec(`${secondProccessThatWontBeKilledAtTheEndOfThisNodeApp} "${peerflixExcutable}" "${magnetLink}" "${subtitle}"`)
    }
}

module.exports = VLCTorrentPlayerGateway

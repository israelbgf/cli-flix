var entity = require('../core/Entity')

function fetchTorrents(name) {
    var torrents = []
    for (var i = 0; i < 5; i++) {
        torrents.push(new entity.Torrent({
            name: 'torrent [YIFI]' + i,
            size: '10 Mib',
            seeders: 123,
            leechers: 123,
            magnetLink: 'magnet-' + i
        }))
    }
    return Promise.resolve(torrents)
}


module.exports = {
    fetchTorrents,
}

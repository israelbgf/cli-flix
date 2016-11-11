var entity = require('../core/Entity')

function fetchTorrents(name) {
    return Promise.resolve([
        new entity.Torrent({
            name: 'Nice Movie 1080p [YIFI]',
            size: '3 Gib',
            seeders: 2617,
            leechers: 345,
            magnetLink: 'magnet:abcdfx14135'
        }),
        new entity.Torrent({
            name: 'Nice Movie: The story of a movie 720p [KILLERS]',
            size: '300 Mib',
            seeders: 214,
            leechers: 123,
            magnetLink: 'magnet:dsidah16231'
        })
    ])
}


module.exports = {
    fetchTorrents,
}

var entity = require('../core/Entity')

function fetchTorrents(name) {
    return Promise.resolve([
        new entity.Torrent({
            name: 'Nice Movie 1080p [RELEASE1]',
            size: '3 Gib',
            seeders: 2617,
            leechers: 345,
            magnetLink: 'magnet:abcdfx14135'
        }),
        new entity.Torrent({
            name: 'Nice Movie: The story of a movie 720p [RELEASE2]',
            size: '300 Mib',
            seeders: 214,
            leechers: 123,
            magnetLink: 'magnet:dsidah16231'
        }),
        new entity.Torrent({
            name: 'Nice Movie: The story of a movie [RELEASE3]',
            size: '670 Mib',
            seeders: 14,
            leechers: 123,
            magnetLink: 'magnet:dzedah16532'
        })
    ])
}


module.exports = {
    fetchTorrents,
}

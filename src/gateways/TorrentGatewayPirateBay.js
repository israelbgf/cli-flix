var PirateBay = require('thepiratebay')
var entity = require('../core/Entity')

function fetchTorrents(name) {
    return new Promise((resolve, reject) => {
        return PirateBay.search(name, {
            category: 'video',
            orderBy: 'seeds',
            sortBy: 'desc',
            filter: {
                verified: true
            }
        }).then((torrents) => {
            resolve(torrents.map((item) => {
                return new entity.Torrent({
                    name: item.name,
                    seeders: item.seeders,
                    leechers: item.leechers,
                    magnetLink: item.magnetLink,
                    size: item.size
                })
            }))
        }).catch(reject)

    })
}


module.exports = {
    fetchTorrents,
}

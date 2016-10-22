var PirateBay = require('thepiratebay')


class TorrentGatewayPirateBay {

    search(name) {
        return PirateBay.search(name, {
            category: 'video',
            orderBy: 'seeds',
            sortBy: 'desc',
            filter: {
                verified: true
            }
        }).then((torrents) => {
            return torrents.map((item) => {
                return {
                    name: item.name,
                    seeders: item.seeders,
                    leechers: item.leechers,
                    magnetLink: item.magnetLink,
                    size: item.size
                }
            })
        })
    }

}

module.exports = TorrentGatewayPirateBay

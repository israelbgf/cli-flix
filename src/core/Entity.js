class Torrent {
    constructor({name, seeders, leechers, size}) {
        this.name = name
        this.seeders = seeders
        this.leechers = leechers
        this.size = size
    }
}

module.exports = {
    Torrent,
}

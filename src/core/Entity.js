class Torrent {
    constructor({name='', seeders, leechers, size, magnetLink}) {
        this.name = name
        this.seeders = seeders
        this.leechers = leechers
        this.size = size
        this.magnetLink = magnetLink
    }
}

class Subtitle {
    constructor({movieName='', subtitleName='', downloadLink}) {
        this.movieName = movieName
        this.subtitleName = subtitleName
        this.downloadLink = downloadLink
    }
}

module.exports = {
    Torrent,
    Subtitle
}

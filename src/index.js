var shell = require('shelljs')
var http = require('http')
var opensubtitles = require('subtitler')
var zlib = require('zlib')
var fs = require('fs')
var path = require('path')
var PirateBay = require('thepiratebay')


class TorrentGateway {

    search(name) {
        return PirateBay.search(name, {
            category: 'video',
            orderBy: 'seeds',
            sortBy: 'desc',
            filter: {
                verified: true
            }
        })
    }

}

class VLCTorrentPlayerGateway {
    play(magnetLink, subtitle) {
        let peerflixExcutable = path.join(__dirname, 'node_modules', 'peerflix', 'app.js')
        shell.exec(`${peerflixExcutable} '${magnetLink}' --vlc --subtitles ${subtitle}`)
    }
}

class FindAndPlayTorrentUsecase {

    constructor(subtitleGateway, downloadGateway, uncompressionGateway,
                torrentGateway, vlcTorrentPlayerGateway) {
        this.subtitleGateway = subtitleGateway
        this.downloadGateway = downloadGateway
        this.uncompressionGateway = uncompressionGateway
        this.torrentGateway = torrentGateway
        this.vlcTorrentPlayerGateway = vlcTorrentPlayerGateway
    }

    execute(movieToFind, subtitleLanguage) {
        this.subtitleGateway.searchSubtitles(movieToFind, subtitleLanguage)
            .then((results) => {
                return results[0]
            })
            .then((choosedSubtitle) => {
                this.downloadGateway.download(choosedSubtitle.link, '.')
                    .then(() => {
                        let subtitleLink = path.basename(choosedSubtitle.link)
                        let subtitleDest = `${subtitleLink}.srt`

                        this.uncompressionGateway.uncompress(subtitleLink, subtitleDest)
                        this.torrentGateway.search(choosedSubtitle.name)
                            .then(results => {
                                return results[0]
                            })
                            .then((firstResult) => {
                                this.vlcTorrentPlayerGateway.play(firstResult.magnetLink, subtitleDest)
                            })
                    })
            })

    }

}


//function run() {
//    var movieToFind = process.argv[2]
//    var subtitleLanguage = process.argv[3]
//
//    new FindAndPlayTorrentUsecase(
//        new SubtitleGateway(),
//        new DownloadGateway(),
//        new UncompressionGateway(),
//        new TorrentGateway(),
//        new VLCTorrentPlayerGateway
//    ).execute(movieToFind, subtitleLanguage)
//}


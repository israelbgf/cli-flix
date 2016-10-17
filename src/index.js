var shell = require('shelljs')
var download = require('download')
var opensubtitles = require('subtitler')
var zlib = require('zlib')
var fs = require('fs')
var path = require('path')
var PirateBay = require('thepiratebay')

class SubtitleGateway {

    searchSubtitles(name, language, callback) {
        opensubtitles.api.login()
            .then(function (token) {
                try {
                    opensubtitles.api.searchForTitle(token, language, name).then(function (results) {
                        results = results.map((item) => {
                            return {
                                name: item.SubFileName.replace('.srt', ''),
                                link: item.SubDownloadLink,
                                languageName: item.LanguageName,
                                downloadCount: item.SubDownloadsCnt,
                                seriesSeason: item.SeriesSeason,
                                seriesEpisode: item.SeriesEpisode,
                                userRank: item.UserRank
                            }
                        })
                        callback(results)
                    })
                } finally {
                    opensubtitles.api.logout(token)
                }
            })
    }

}

class DownloadGateway {

    download(url, dest) {
        return download(url, dest)
    }

}

class UncompressionGateway {

    uncompress(url, dest) {
        const gunzip = zlib.createGunzip()
        const input = fs.createReadStream(url)
        const output = fs.createWriteStream(dest)
        input.pipe(gunzip).pipe(output)
        output.on('close', function () {
            input.unpipe(gunzip)
            input.unpipe(output)
        })
    }

}

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
        shell.exec(`peerflix '${magnetLink}' --vlc --subtitles ${subtitle}`)
    }
}

new SubtitleGateway().searchSubtitles('Westworld S01E02', 'pob', (results) => {
    var mainSubtitle = results[0]
    new DownloadGateway().download(mainSubtitle.link, '.').then(() => {
        let subtitleLink = path.basename(mainSubtitle.link)
        let subtitleDest = `${subtitleLink}.srt`

        new UncompressionGateway().uncompress(subtitleLink, subtitleDest)
        new TorrentGateway().search(mainSubtitle.name).then(results => {
            let firstResult = results[0]
            new VLCTorrentPlayerGateway().play(firstResult.magnetLink, subtitleDest)
        }).catch(err => {
            console.log(err)
        })
    })
})

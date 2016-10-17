require('shelljs/global')

var download = require('download')
var opensubtitles = require('subtitler')
var zlib = require('zlib')
var fs = require('fs')
var path = require('path')

class SubtitleGateway {

    searchSubtitles(name, language, callback) {
        opensubtitles.api.login()
            .then(function (token) {
                try {
                    opensubtitles.api.searchForTitle(token, language, name).then(function (results) {
                        results = results.map((item) => {
                            return {
                                name: item.SubFileName,
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
        output.on('close', function() {
            input.unpipe(gunzip)
            input.unpipe(output)
        })
    }

}

new SubtitleGateway().searchSubtitles('Westworld S01E02', 'pob', (results) => {
    new DownloadGateway().download(results[0].link, '.').then((file) => {
        let filename = path.basename(results[0].link)
        new UncompressionGateway().uncompress(filename, `${filename}.srt`)
    })
})


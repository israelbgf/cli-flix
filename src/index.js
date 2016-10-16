require('shelljs/global')
var opensubtitles = require('subtitler')

class SubtitlesGateway {

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


new SubtitlesGateway().searchSubtitles('Westworld S01E02', 'pob', (results) => console.log(results))

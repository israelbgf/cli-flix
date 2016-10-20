var opensubtitles = require('subtitler')

class SubtitleGatewayOpensubtitles {

    searchSubtitles(name, language) {
        return new Promise((resolve, reject) => {
            opensubtitles.api.login()
                .then(function (token) {
                    try {
                        opensubtitles.api.searchForTitle(token, language, name).then((results) => {
                            resolve(results.map((item) => {
                                return {
                                    name: item.SubFileName,
                                    link: item.SubDownloadLink,
                                    languageName: item.LanguageName,
                                    downloadCount: item.SubDownloadsCnt,
                                    seriesSeason: item.SeriesSeason,
                                    seriesEpisode: item.SeriesEpisode,
                                    userRank: item.UserRank
                                }
                            }))
                        })
                    } finally {
                        opensubtitles.api.logout(token)
                    }
                })

        })
    }

}

module.exports = SubtitleGatewayOpensubtitles

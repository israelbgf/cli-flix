require('shelljs/global');
var opensubtitles = require("subtitler");

function getSubtitle(name, language, callback){
    opensubtitles.api.login()
        .then(function(token){
            try {
                opensubtitles.api.searchForTitle(token, 'pob', 'Westworld S01E02').then(function(results){
                    results = results.map(function(item){
                        return {
                            name: item.SubFileName,
                            link: item.SubDownloadLink,
                            languageName: item.LanguageName,
                            downloadCount: item.SubDownloadsCnt,
                            seriesSeason: item.SeriesSeason,
                            seriesEpisode: item.SeriesEpisode,
                            userRank: item.UserRank,
                        }
                    })
                    console.log(results)
                })
            } finally {
                opensubtitles.api.logout(token)
            }
        });
}

getSubtitle()

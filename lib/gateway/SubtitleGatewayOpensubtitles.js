var opensubtitles = require('subtitler')
var path = require('path')
var uncompressionGateway = require('./UncompressionGatewayNode.js');
var downloadGateway = require('./DownloadGatewayNode.js');
var entity = require('../core/Entity')

function fetchSubtitles(name, language) {
    return new Promise((resolve, reject) => {
        opensubtitles.api.login()
            .then(function (token) {
                try {
                    opensubtitles.api.searchForTitle(token, language, name).then((results) => {
                        resolve(results.map((item) => {
                            return new entity.Subtitle({
                                subtitleName: item.SubFileName,
                                movieName: item.MovieReleaseName,
                                downloadLink: item.SubDownloadLink,
                            })
                        }))
                    })
                } finally {
                    opensubtitles.api.logout(token)
                }
            })
            .catch((error) => {
                reject(error)
            })


    })
}

function downloadSubtitle(subtitle, destination) {
    return new Promise((resolve, reject) => {
        downloadGateway.download(subtitle.downloadLink, destination)
            .then(downloadedFile => {
                return uncompressionGateway.uncompress(
                    downloadedFile,
                    path.join(destination, subtitle.subtitleName)
                )
            })
            .then(uncompressedSubtitle => {
                resolve(uncompressedSubtitle)
            }).catch(reject)

    })
}


module.exports = {
    fetchSubtitles,
    downloadSubtitle,
}

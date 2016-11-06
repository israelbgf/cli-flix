function fetchSubtitles(name, language) {
    var subtitles = []
    for (var i = 0; i < 5; i++) {
        subtitles.push({
            movieName: 'subtitle ' + i,
            subtitleName: 'subtitle_' + i + '.srt',
        })
    }
    return Promise.resolve(subtitles)
}

function downloadSubtitle(subtitle, destination) {
    //new HttpDownloadGateway().download(choosedSubtitle.downloadLink, '.')
    //    .then(downloadedFile => {
    //        return new UncompressionGatewayNode().uncompress(downloadedFile, './' + choosedSubtitle.subtitleName)
    //    })
    //    .then(uncompressedSubtitle => {
    //
    //    })
    return Promise.resolve('/tmp/subtitle.srt')
}

module.exports = {
    fetchSubtitles,
    downloadSubtitle
}

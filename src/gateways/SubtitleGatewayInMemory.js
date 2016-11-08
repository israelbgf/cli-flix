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
    return Promise.resolve('/tmp/subtitle.srt')
}

module.exports = {
    fetchSubtitles,
    downloadSubtitle
}

var entity = require('../core/Entity.js');

function fetchSubtitles(name, language) {
    return Promise.resolve([
        new entity.Subtitle({
            movieName: 'Nice Movie: The Story of a Moview [RELEASE1] (1999)',
            subtitleName: 'NiceMoview.srt',
        }),
        new entity.Subtitle({
            movieName: 'Nice Movie: The Story of a Moview (1999)',
            subtitleName: 'NiceMoview.RELEASE2.srt',
        })
    ])
}

function downloadSubtitle(subtitle, destination) {
    return Promise.resolve('/tmp/subtitle.srt')
}

module.exports = {
    fetchSubtitles,
    downloadSubtitle
}

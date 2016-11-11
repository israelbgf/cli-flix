var entity = require('../core/Entity.js');

function fetchSubtitles(name, language) {
    return Promise.resolve([
        new entity.Subtitle({
            movieName: 'Nice Movie: The Story of a Moview (1999)',
            subtitleName: 'NiceMoview.KILLERS.srt',
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

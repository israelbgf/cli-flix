var child_process = require('child_process')

function startStreaming([magnetLink, subtitle]) {
    console.log('MagnetLink: ' + magnetLink)
    console.log('Subtitle: ' + subtitle)
    console.log('Initializing streaming, this can take a while...')
    child_process.spawn('peerflix', [magnetLink, '--vlc', '--subtitles', subtitle])
}

module.exports = {
    startStreaming
}



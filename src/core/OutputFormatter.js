var pad = require('pad');
var clc = require('cli-color')
var core = require('./SuggestMatch')

function formatTorrent(torrent, position) {
    let torrentName = formatTorrentName(torrent)
    let torrentSize = formatTorrentSize(torrent)
    let seeders = formatTorrentSeeders(torrent)
    let leechers = formatTorrentLeechers(torrent)
    return `${position}. ${torrentName} ${torrentSize} ${seeders} ${leechers}`
}

function formatTorrentName(torrent) {
    return pad(torrent.name, 60)
}

function formatTorrentSize(torrent) {
    return pad(10, torrent.size)
}

function formatTorrentSeeders(torrent) {
    return pad("S:" + torrent.seeders, 8)
}

function formatTorrentLeechers(torrent) {
    return pad("L:" + torrent.leechers, 8)
}

function formatSubtitle(subtitle, position) {
    return `${position}. ${subtitle.movieName}\n   ${subtitle.subtitleName}`
}


function displayOptions(torrents, subtitles, highlight) {
    let orange = clc.xterm(202)

    console.log('')
    console.log('Torrents')
    console.log(orange('--------'))
    torrents.forEach((item, position) => {
        console.log(formatTorrent(item, position))
    })

    console.log('')
    console.log('Subtitles')
    console.log(orange('--------'))
    subtitles.forEach((item, position) => {
        console.log(formatSubtitle(item, position))
    })

    console.log('')
    console.log('Suggestion')
    console.log(orange('--------'))
    try {
        var [torrent, subtitle] = core.suggestMatch(torrents, subtitles, highlight)
        console.log(torrent.name)
        console.log(subtitle.subtitleName)
        console.log(torrent.size)
    } catch (e) {
        console.log('Your keywords were useless bro. Good luck.')
    }

    console.log('')
}


function clearTerminal() {
    process.stdout.write(clc.reset)
}


module.exports = {
    formatTorrent,
    formatTorrentName,
    formatTorrentSize,
    formatTorrentSeeders,
    formatTorrentLeechers,
    formatSubtitle,
    clearTerminal,
    displayOptions,
}

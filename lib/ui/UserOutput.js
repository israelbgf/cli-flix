var pad = require('pad');
var clc = require('cli-color')
var core = require('./../core/SuggestMatch')
let orange = clc.xterm(202)

const SEPARATOR = '---------------'
const FN_COLORS = [
    clc.bgRedBright, clc.bgBlueBright,
    clc.bgMagentaBright, clc.bgCyanBright,
    clc.bgYellowBright, clc.bgGreenBright
]

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


function createSuggestionOutput(torrents, subtitles, highlight) {
    try {
        var [torrent, subtitle] = core.suggestMatch(torrents, subtitles, highlight)
        let torrentChoiceIndex = null, subtitleChoiceIndex = null
        torrents.forEach((t, i) => {
            if (t.name == torrent.name) torrentChoiceIndex = i
        })
        subtitles.forEach((s, i) => {
            if (s.subtitleName == subtitle.subtitleName) subtitleChoiceIndex = i
        })

        return (
            `I recommend the following choice (${orange(torrentChoiceIndex)} and ${orange(subtitleChoiceIndex)}):\n`
            + `${torrent.name} / ${subtitle.subtitleName}\n`
            + `${torrent.size}${formatTorrentSeeders(torrent)}${formatTorrentLeechers(torrent)}\n`
        )
    } catch (e) {
        return 'Your keywords were useless bro. Good luck.'
    }
}
function createSummaryOfChoices(torrentsWithHighlights, subtitlesWithHighlights, suggestionOutput) {
    let string = ''
    string += `\nTorrents\n${SEPARATOR}\n`
    string += torrentsWithHighlights.join('\n')
    string += `\nSubtitles\n${SEPARATOR}\n`
    string += subtitlesWithHighlights.join('\n')
    string += `\Suggestion\n${SEPARATOR}\n`
    string += suggestionOutput
    return string
}

function displayOptions(torrents, subtitles, keywords) {
    [torrentsWithHighlights, subtitlesWithHighlights] = highlightMatches(
        torrents.map(formatTorrent),
        subtitles.map(formatSubtitle),
        keywords,
        createHighlighter(FN_COLORS)
    )

    console.log(createSummaryOfChoices(
        torrentsWithHighlights,
        subtitlesWithHighlights,
        createSuggestionOutput(torrents, subtitles, keywords)
    ))
}

function highlightMatches(torrents, subtitles, keywords, highlighter) {
    highlighter = highlighter || ((text) => orange(text))
    keywords.forEach((keyword) => {
        console.log(keyword)
        if (torrents.join().includes(keyword) && subtitles.join().includes(keyword)) {
            torrents = torrents.map((t) => t.replace(keyword, highlighter(keyword)))
            subtitles = subtitles.map((s) => s.replace(keyword, highlighter(keyword)))
        }
    })

    return [torrents, subtitles]

}

function createHighlighter(hilightingFunctionsToAlternate) {
    let lastKeyword
    let fnToUse
    let fnIterator = 0
    return (keyword) => {
        if (!lastKeyword) {
            fnToUse = hilightingFunctionsToAlternate[0]
        } else if (lastKeyword != keyword) {
            if (hilightingFunctionsToAlternate.length <= fnIterator + 1) {
                fnIterator = 0
            } else {
                fnIterator++
            }
            fnToUse = hilightingFunctionsToAlternate[fnIterator]
        }

        lastKeyword = keyword
        return fnToUse(keyword)
    }
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
    highlightMatches,
    createHighlighter
}

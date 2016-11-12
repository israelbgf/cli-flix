var userOutput = require('./ui/UserOutput')
var userInput = require('./ui/UserInput')
var os = require('os')

if (process.env.DEVELOPMENT) {
    var torrentGateway = require('./gateway/TorrentGatewayInMemory')
    var subtitleGateway = require('./gateway/SubtitleGatewayInMemory')
    var playerGateway = require('./gateway/TorrentStreamPlayerGatewayFake')
} else {
    var torrentGateway = require('./gateway/TorrentGatewayPirateBay')
    var subtitleGateway = require('./gateway/SubtitleGatewayOpensubtitles')
    var playerGateway = require('./gateway/TorrentStreamPlayerGatewayPeerflix')
}


let argv = userInput.parseCLIInput()

function main() {
    userOutput.clearTerminal()
    Promise.all([
            torrentGateway.fetchTorrents(argv.name),
            subtitleGateway.fetchSubtitles(argv.name, argv.language)
        ])
        .then(displayOptionsAndAskForUserChoice)
        .then(getChoicesAndDownloadSubtitle)
        .then(playerGateway.startStreaming)
        .catch(console.log)
}

function displayOptionsAndAskForUserChoice([torrents, subtitles]) {
    userOutput.displayOptions(torrents, subtitles, argv.highlight)
    return userInput.askForWhichTorrentAndSubtitle(torrents, subtitles)
}

function getChoicesAndDownloadSubtitle([answer, torrents, subtitles]) {
    let choosedTorrent = torrents[answer.torrentIndex]
    let choosedSubtitle = subtitles[answer.subtitleIndex]
    return Promise.all([
        choosedTorrent.magnetLink,
        subtitleGateway.downloadSubtitle(choosedSubtitle, os.tmpdir())
    ])
}

module.exports = main;

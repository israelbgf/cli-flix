var formatter = require('./ui/UserOutput')
var userInput = require('./ui/UserInput');
var playerGateway = require('./gateway/TorrentStreamPlayerGatewayPeerflix');
var os = require('os');

if (process.env.DEVELOPMENT) {
    var torrentGateway = require('./gateway/TorrentGatewayInMemory')
    var subtitleGateway = require('./gateway/SubtitleGatewayInMemory')
} else {
    var torrentGateway = require('./gateway/TorrentGatewayPirateBay')
    var subtitleGateway = require('./gateway/SubtitleGatewayOpensubtitles')
}


formatter.clearTerminal()
let argv = userInput.parseCLIInput()

Promise.all([
        torrentGateway.fetchTorrents(argv.name),
        subtitleGateway.fetchSubtitles(argv.name, argv.language)
    ])
    .then(([torrents, subtitles]) => {
        formatter.displayOptions(torrents, subtitles, argv.highlight)
        return userInput.askForWhichTorrentAndSubtitle(torrents, subtitles)
    })
    .then(function ([answer, torrents, subtitles]) {
        let choosedTorrent = torrents[answer.torrentIndex]
        let choosedSubtitle = subtitles[answer.subtitleIndex]
        return Promise.all([
            choosedTorrent,
            subtitleGateway.downloadSubtitle(choosedSubtitle, os.tmpdir())
        ])
    })
    .then(function ([torrent, subtitle]) {
        playerGateway.startStreaming(torrent.magnetLink, subtitle)
    })
    .catch(console.log)

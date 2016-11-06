var inquirer = require('inquirer')
var formatter = require('./core/OutputFormatter')
var yargs = require('yargs')
var torrentGateway = require('./gateways/TorrentGatewayInMemory')
var subtitleGateway = require('./gateways/SubtitleGatewayInMemory')


function parseUserInput() {
    return yargs
        .detectLocale(false)
        .usage('Usage: $0 -name "Nice Series s01e02" -l pob -hl keyword1 keyword2')
        .options({
            'n': {
                alias: 'name',
                demand: true,
                describe: 'Name of the movie to search for',
                type: 'string'
            },
            'l': {
                alias: 'language',
                default: 'pob',
                describe: 'Language to search for subtitle',
                type: 'string'
            },
            'hl': {
                alias: 'highlight',
                default: ['x', 'z'],
                describe: 'Keywords to highlight in the search result',
                type: 'array'
            },
        }).argv;
}

function askForWhichTorrentAndSubtitle(torrents, subtitles) {
    return Promise.all([inquirer.prompt([
        {
            type: 'input',
            name: 'torrentIndex',
            message: 'Which torrent to stream?',
            default: '0',
            filter: parseInt,
            validate: answer => {
                return answer < torrents.length || "Invalid choice."
            },
        },
        {
            type: 'input',
            name: 'subtitleIndex',
            message: 'Which subtitle to use?',
            default: '0',
            filter: parseInt,
            validate: answer => {
                return answer < subtitles.length || "Invalid choice."
            },
        }

    ]), torrents, subtitles]);
}

function startStreaming(torrent, subtitle) {
    console.log(`peerflix "${torrent.magnetLink}" --vlc --subtitles ${subtitle}"`)
}


formatter.clearTerminal()
let argv = parseUserInput()

Promise.all([
        torrentGateway.fetchTorrents(argv.name),
        subtitleGateway.fetchSubtitles(argv.name, argv.language)
    ])
    .then(([torrents, subtitles]) => {
        formatter.displayOptions(torrents, subtitles)
        return askForWhichTorrentAndSubtitle(torrents, subtitles)
    })
    .then(function ([answer, torrents, subtitles]) {
        let choosedTorrent = torrents[answer.torrentIndex]
        let choosedSubtitle = subtitles[answer.subtitleIndex]
        return Promise.all([
            choosedTorrent,
            subtitleGateway.downloadSubtitle(choosedSubtitle, '.')
        ])
    })
    .then(function ([torrent, subtitle]) {
        startStreaming(torrent, subtitle)
    })
    .catch(console.log)

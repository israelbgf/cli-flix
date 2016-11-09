var inquirer = require('inquirer')
var formatter = require('./core/OutputFormatter')
var yargs = require('yargs')
var child_process = require('child_process');

if(process.env.DEVELOPMENT){
    var torrentGateway = require('./gateways/TorrentGatewayInMemory')
    var subtitleGateway = require('./gateways/SubtitleGatewayInMemory')
} else {
    var torrentGateway = require('./gateways/TorrentGatewayPirateBay')
    var subtitleGateway = require('./gateways/SubtitleGatewayOpensubtitles')
}


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

function startStreaming(magnetLink, subtitle) {
    console.log('Initializing streaming, this can take a while...')
    child_process.spawn('peerflix', [magnetLink, '--vlc', '--subtitles', subtitle])
}


formatter.clearTerminal()
let argv = parseUserInput()

Promise.all([
        torrentGateway.fetchTorrents(argv.name),
        subtitleGateway.fetchSubtitles(argv.name, argv.language)
    ])
    .then(([torrents, subtitles]) => {
        formatter.displayOptions(torrents, subtitles, argv.highlight)
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
        startStreaming(torrent.magnetLink, subtitle)
    })
    .catch(console.log)

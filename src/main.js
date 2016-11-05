var inquirer = require('inquirer')
var entity = require('./core/Entity')
var formatter = require('./core/OutputFormatter')
var userInput = require('./core/UserInputParser')
var yargs = require('yargs')

function fetchTorrents(name) {
    var torrents = []
    for (var i = 0; i < 5; i++) {
        torrents.push(new entity.Torrent({
            name: 'torrent [YIFI]' + i,
            size: '10 Mib',
            seeders: 123,
            leechers: 123,
            magnetLink: 'magnet-' + i
        }))
    }
    return Promise.resolve(torrents)
}


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
    //new HttpDownloadGateway().download(choosedSubtitle.downloadLink, '.')
    //    .then(downloadedFile => {
    //        return new UncompressionGatewayNode().uncompress(downloadedFile, './' + choosedSubtitle.subtitleName)
    //    })
    //    .then(uncompressedSubtitle => {
    //
    //    })
    return Promise.resolve('/tmp/subtitle.srt')
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
            name: 'choice',
            message: 'Which one to stream?',
            default: '0.0',
            validate: answer => {
                return userInput.validateChoice(answer, torrents.length, subtitles.length) || "Invalid choice."
            },
        }
    ]), torrents, subtitles]);
}

function startStreaming(torrent, subtitle) {
    console.log(`peerflix "${torrent.magnetLink}" --vlc --subtitles ${subtitle}"`)
}


formatter.clearTerminal()
let argv = parseUserInput()

Promise.all([fetchTorrents(argv.name), fetchSubtitles(argv.name, argv.language)])
    .then(([torrents, subtitles]) => {
        formatter.displayOptions(torrents, subtitles)
        return askForWhichTorrentAndSubtitle(torrents, subtitles)
    })
    .then(function ([answer, torrents, subtitles]) {
        let [choosedTorrentIndex, choosedSubtitleIndex] = answer.choice.split('.')
        let choosedTorrent = torrents[choosedTorrentIndex]
        let choosedSubtitle = subtitles[choosedSubtitleIndex]
        return Promise.all([choosedTorrent, downloadSubtitle(choosedSubtitle, '.')])
    })
    .then(function ([torrent, subtitle]) {
        startStreaming(torrent, subtitle)
    })
    .catch(console.log)

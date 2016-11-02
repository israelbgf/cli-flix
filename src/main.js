var clc = require('cli-color')
var inquirer = require('inquirer');
var entity = require('./core/Entity');
var formatter = require('./core/OutputFormatter');


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


function displayOptions(torrents, subtitles) {
    let orange = clc.xterm(202)

    console.log('')
    console.log('Torrents')
    console.log(orange('--------'))
    torrents.forEach((item, position) => {
        console.log(formatter.formatTorrent(item, position))
    })
    console.log('')
    console.log('Subtitles')
    console.log(orange('--------'))
    subtitles.forEach((item, position) => {
        console.log(formatter.formatSubtitle(item, position))
    })
    console.log('')
}


function clearTerminal() {
    process.stdout.write(clc.reset)
}


clearTerminal()
inquirer.prompt([
    {
        type: 'input',
        name: 'query',
        message: 'Which torrent are you looking for?',
        default: '',
        validate: (answer) => {
            return true
        }
    },
    {
        type: 'input',
        name: 'language',
        default: 'pob',
        message: 'Which language for the subtitle?',
        validate: (answer) => {
            return true
        }
    }
]).then(answers => {
    return Promise.all([
        fetchTorrents(answers.query),
        fetchSubtitles(answers.query, answers.language)
    ])
}).then(torrentsAndSubtitles => {
    let torrents = torrentsAndSubtitles[0]
    let subtitles = torrentsAndSubtitles[1]
    displayOptions(torrents, subtitles)
    return inquirer.prompt([
        {
            type: 'input',
            name: 'query',
            message: 'Which one to stream?',
            default: '1.1',
            validate: answer => {
                return true
            },
            filter: answer => {
                return 'xxx'
            }
        }
    ])
}).then(function (answers) {
    console.log(answers)
    console.log('peerflix "magnet" --vlc --subtitles "subtitle.srt"');
}).catch(error => console.log(error))
